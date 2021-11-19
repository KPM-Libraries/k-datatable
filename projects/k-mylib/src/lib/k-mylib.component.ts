import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

interface DataTable {
  translation?: {
    add?: string,
    filter?: string,
    allItems?: string,
    totalItems?: string,
    show?: string
  }
  addItem?: boolean,
  style?: any,
  view?: {
    itemsPerPage?: number,
    showedItems?: Array<number>
  }
  header: Array<{ name?: string, type: string, order: boolean, filter: boolean, width?: number, styleClass?: { width?: number } }>,
  footer?: Array<string>,
  items: Array<{
    inputData: any,
    data: Array<{
      content: any, styleClass?: string, condition?: string
    }>
  }>
}

@Component({
  selector: 'lib-k-mylib',
  templateUrl: './k-mylib.component.html',
  styleUrls: ['./k-mylib.component.scss']
})

export class KMylibComponent implements OnChanges {

  //IO variables
  @Input() data: DataTable = {
    header: [],
    items: []
  }
  @Output() event = new EventEmitter()
  @Input() test: any

  //component variables
  //component variables
  items: any[] = []
  filterTable: any
  isFilter: boolean = false
  orderStatus: any
  pagination: any
  selectedItems = new Array()

  previousLength = 0
  previousData = {}

  constructor() {
    setInterval(() => {
      //if (this.previousLength != this.data.items.length) {
      if (JSON.stringify(this.previousData) != JSON.stringify(this.data.items)) {
        this.previousData = [...this.data.items]
        this.previousLength = this.data.items.length
        this.items = [...this.data.items]
        this.filter()
      }
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.items = [...this.data.items]

    if (changes.data.isFirstChange()) {

      //init filter table with the number of columns length
      this.filterTable = new Array(this.data?.header?.length)

      //init current order status
      this.orderStatus = {
        index: -1,
        type: '',
        ascOrDescTable: new Array<number>()
      }

      //init pagination
      let elementsPerPage = this.data?.view?.itemsPerPage ? this.data.view.itemsPerPage : this.data?.view?.showedItems && this.data?.view?.showedItems[0] ? this.data?.view?.showedItems[0] : 10
      this.pagination = {
        elementsPerPage: elementsPerPage,
        current: 1,
        total: Math.ceil(this.items.length / elementsPerPage)
      }

    } else
      this.filter()

  }

  //component functions

  //emit event
  emitEvent(event: any) {
    this.event.emit(event)
  }

  //filter rows
  filter(): void {
    this.items = [...this.data.items]
    if (this.orderStatus.index != -1)
      this.order(this.orderStatus.index, this.orderStatus.type, true)

    let i = 0
    while (i < this.items.length)
      if (!this.filterAccepted(this.items[i].data))
        this.items.splice(i, 1)
      else
        i++
    this.setPagination()
  }

  //verify if filter is true in some cel
  filterAccepted(item: any): Boolean {
    for (let i = 0; i < this.filterTable.length; i++)
      if (this.filterTable[i] != null && this.filterTable[i] != '') {
        switch (this.data.header[i]?.type) {
          case 'list':
            if (!this.filterInsideList(item[i]?.content, this.filterTable[i].toLowerCase()))
              return false
            break
          case 'image':
            if (!item[i]?.content?.src.includes(this.filterTable[i]))
              return false
            break
          case 'date':
          case 'link':
            if (!item[i]?.content?.value.toLowerCase().includes(this.filterTable[i].toLowerCase()))
              return false
            break
          case 'number':
          case 'progress':
            console.log(item[i]?.content as string)
            if (!('' + item[i]?.content).toLowerCase().includes(this.filterTable[i].toLowerCase()))
              return false
            break
          default: //all other types
            if (!item[i]?.content.toLowerCase().includes(this.filterTable[i].toLowerCase()))
              return false
            break
        }
      }
    return true
  }

  //verify if filter is true in list
  filterInsideList(list: Array<any>, text: string): Boolean {
    for (let item of list)
      if (item.toLowerCase().includes(text))
        return true
    return false
  }

  //order rows
  order(index: number, type: string, force?: boolean): void {
    if (index != this.orderStatus.index || type != this.orderStatus.type || force) {
      this.orderStatus.index = index
      this.orderStatus.type = type
      this.orderStatus.ascOrDescTable = type == 'ASC' ? [-1, 1] : type == 'DESC' ? [1, -1] : []
      if (this.orderStatus.ascOrDescTable.length > 0)
        this.items = this.items.sort((elt1: any, elt2: any): number => {
          if (typeof elt1.data[index]?.content != typeof elt2.data[index]?.content)
            return -1
          switch (this.data.header[index]?.type) {
            case 'date':
              return (elt1.data[index]?.content?.date.getTime() - elt2.data[index]?.content?.date.getTime()) * this.orderStatus.ascOrDescTable[1]
            case 'link':
              return elt1.data[index]?.content?.value.toString().toLowerCase() == elt2.data[index]?.content?.value.toString().toLowerCase() ? 0 : elt1.data[index]?.content?.value.toString().toLowerCase() < elt2.data[index]?.content?.value.toString().toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
            case 'list':
              return elt1.data[index]?.content.join('').toLowerCase() == elt2.data[index]?.content.join('').toLowerCase() ? 0 : elt1.data[index]?.content.join('').toLowerCase() < elt2.data[index]?.content.join('').toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
            case 'image':
              return elt1.data[index]?.content?.src.toString().toLowerCase() == elt2.data[index]?.content?.src.toString().toLowerCase() ? 0 : elt1.data[index]?.content?.src.toString().toLowerCase() < elt2.data[index]?.content?.src.toString().toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
            default: //all other types
              return elt1.data[index]?.content.toString().toLowerCase() == elt2.data[index]?.content.toString().toLowerCase() ? 0 : elt1.data[index]?.content.toString().toLowerCase() < elt2.data[index]?.content.toString().toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
          }
        })
    } else {
      this.orderStatus.index = -1
      this.orderStatus.type = ''
      this.filter()
    }
    this.setPagination()
  }

  //set pagination params
  setPagination(elementPerPage?: number): void {
    let elementPerPageValue = !elementPerPage ? this.pagination.elementsPerPage : elementPerPage != -1 ? elementPerPage : this.items.length
    let total = Math.ceil(this.items.length / elementPerPageValue)
    this.pagination = {
      elementsPerPage: elementPerPageValue,
      current: this.pagination.current <= total && this.pagination.current != 0 ? this.pagination.current : total,
      total: total
    }
  }

  changeNumberOfElementsPerPage(event: any) {
    this.setPagination(+event?.target?.value)
  }

  //evaluate if some condition is true
  evalCondition(condition: string, index: number) {
    condition = condition.split("fields[").join("this.data.items[index].data[")
    return eval(condition)
  }

}
