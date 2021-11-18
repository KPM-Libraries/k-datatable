import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface DataTable {
  translation?: { add?: string, filter?: string, allItems?: string }
  addItem?: boolean,
  style?: any,
  header: Array<{ name: string, type: string, order: boolean, filter: boolean, width?: number, styleClass?: { width?: number } }>,
  footer?: Array<string>,
  items: Array<{
    id: number,
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
export class KMylibComponent implements OnInit {

  //IO variables
  @Input() data: DataTable = {
    header: [],
    items: []
  }
  @Output() event = new EventEmitter()

  //component variables
  filterTable: any
  isFilter: boolean = false
  startedItems: any
  orderStatus: any
  pagination: any
  selectedItems = new Array()

  constructor() { }

  ngOnInit(): void {
    //init filter table with the number of columns length
    this.filterTable = new Array(this.data?.header?.length)

    //save started data items
    this.startedItems = [...this.data.items]

    //init current order status
    this.orderStatus = {
      index: -1,
      type: '',
      ascOrDescTable: new Array<number>()
    }

    //init pagination
    this.pagination = {
      elementsPerPage: 10,
      current: 1,
      total: Math.ceil(this.data.items.length / 10)
    }
  }

  //component functions

  //emit event
  emitEvent(event: any) {
    this.event.emit(event)
  }

  //filter rows
  filter(): void {
    this.data.items = [...this.startedItems]
    if (this.orderStatus.index != -1)
      this.order(this.orderStatus.index, this.orderStatus.type, true)

    let i = 0
    while (i < this.data.items.length)
      if (!this.filterAccepted(this.data.items[i].data))
        this.data.items.splice(i, 1)
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
          case 'number':
          case 'progress':
            if (item[i].content != this.filterTable[i])
              return false
            break
          case 'date':
          case 'link':
            if (!item[i]?.content?.value.toLowerCase().includes(this.filterTable[i].toLowerCase()))
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
        this.data.items = this.data?.items.sort((elt1: any, elt2: any): number => {
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
    let elementPerPageValue = !elementPerPage ? this.pagination.elementsPerPage : elementPerPage != -1 ? elementPerPage : this.data.items.length
    let total = Math.ceil(this.data.items.length / elementPerPageValue)
    this.pagination = {
      elementsPerPage: elementPerPageValue,
      current: this.pagination.current <= total && this.pagination.current != 0 ? this.pagination.current : total,
      total: total
    }
  }

  changeNumberOfElementsPerPage(event: any) {
    this.setPagination(+event?.target?.content)
  }

  //evaluate if some condition is true
  evalCondition(condition: string, index: number) {
    condition = condition.split("fields[").join("this.startedItems[index].data[")
    return eval(condition)
  }

}
