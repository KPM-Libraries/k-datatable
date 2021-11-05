import { Component } from '@angular/core';
interface DataTable {
  addData: boolean,
  type?: string,
  style?: string,
  header: Array<{ name: string, type: string, order: boolean, filter: boolean }>,
  footer?: Array<string>,
  items: Array<Array<{ value: any, style?: string, src?: string, width?: string, height?: string, condition?: string }>>
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  data: DataTable = {
    addData: true,
    header: [
      {
        name: "Header 1",
        type: "text",
        order: true,
        filter: true
      },
      {
        name: "Header 2",
        type: "text",
        order: true,
        filter: false
      },
      {
        name: "Header 3",
        type: "list",
        order: false,
        filter: true
      },
      {
        name: "Header 4",
        type: "date",
        order: false,
        filter: false
      },
      {
        name: "Actions",
        type: "buttons",
        order: false,
        filter: false
      }
    ],
    footer: ["Footer 1", "Footer 2", "Footer 3", "Footer 4"],
    items: [
      [
        {
          value: "Cel 12",
          condition: "fields[1].value === 5"
        },
        {
          value: 5,
          style: "k-bg-danger"
        },
        {
          value: ["rtas", "World"]
        },
        {
          value: new Date('4/7/2025').toLocaleDateString()
        },
        {
          value: [
            {
              style: "k-bg-fuchsia",
              title: "Modifier",
              event: "update"
            }
          ]
        }
      ],
      [
        {
          value: "Cel 5"
        },
        {
          value: 8
        },
        {
          value: ["aello"]
        },
        {
          value: new Date('5/7/2019').toLocaleDateString()
        }
      ],
      [
        {
          value: "Cel 1"
        },
        {
          value: 1
        },
        {
          value: ["Hello", "World"]
        },
        {
          value: new Date().toLocaleDateString()
        }
      ]
    ]
  }

  filterTable = new Array(this.data?.header?.length)

  startedItems = [...this.data.items]

  orderStatus = {
    index: -1,
    type: '',
    ascOrDescTable: new Array<number>()
  }

  pagination = {
    elementsPerPage: 2,
    current: 1,
    total: Math.ceil(this.data.items.length / 2)
  }


  //filter part
  filter(): void {
    this.data.items = [...this.startedItems]
    if (this.orderStatus.index != -1)
      this.order(this.orderStatus.index, this.orderStatus.type, true)

    let i = 0
    while (i < this.data.items.length)
      if (!this.filterAccepted(this.data.items[i]))
        this.data.items.splice(i, 1)
      else
        i++
    this.setPagination()
  }

  filterAccepted(item: any): Boolean {
    for (let i = 0; i < this.filterTable.length; i++)
      if (this.filterTable[i] != null && this.filterTable[i] != '') {
        switch (this.data.header[i]?.type) {
          case 'text':
          case 'bold':
          case 'badge':
            if (!item[i]?.value.toLowerCase().includes(this.filterTable[i].toLowerCase()))
              return false
            break
          case 'list':
            if (!this.filterInsideList(item[i]?.value, this.filterTable[i].toLowerCase()))
              return false
            break
          case 'image':
            if (!item[i]?.value?.src.includes(this.filterTable[i]))
              return false
            break
        }
      }
    return true
  }

  filterInsideList(list: Array<any>, text: string): Boolean {
    for (let item of list)
      if (item.toLowerCase().includes(text))
        return true
    return false
  }

  order(index: number, type: string, force?: boolean): void {
    if (index != this.orderStatus.index || type != this.orderStatus.type || force) {
      this.orderStatus.index = index
      this.orderStatus.type = type
      this.orderStatus.ascOrDescTable = type == 'ASC' ? [-1, 1] : type == 'DESC' ? [1, -1] : []
      if (this.orderStatus.ascOrDescTable.length > 0)
        this.data.items = this.data?.items.sort((elt1: any, elt2: any): number => {
          console.log(55555)
          if (typeof elt1[index]?.value != typeof elt2[index]?.value)
            return -1
          switch (this.data.header[index]?.type) {
            case 'date':
              return (new Date(elt1[index]?.value).getTime() - new Date(elt2[index]?.value).getTime()) * this.orderStatus.ascOrDescTable[1]
            case 'list':
              return elt1[index]?.value.join('').toLowerCase() == elt2[index]?.value.join('').toLowerCase() ? 0 : elt1[index]?.value.join('').toLowerCase() < elt2[index]?.value.join('').toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
            default: //all other types
              return elt1[index]?.value.toString().toLowerCase() == elt2[index]?.value.toString().toLowerCase() ? 0 : elt1[index]?.value.toString().toLowerCase() < elt2[index]?.value.toString().toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
          }
        })
    } else {
      this.orderStatus.index = -1
      this.orderStatus.type = ''
      this.filter()
    }
    this.setPagination()
  }

  setPagination(elementPerPage?: number): void {
    let total = Math.ceil(this.data.items.length / 2)
    this.pagination = {
      elementsPerPage: elementPerPage ? elementPerPage : this.pagination.elementsPerPage,
      current: this.pagination.current <= total && this.pagination.current != 0 ? this.pagination.current : total,
      total: total
    }
  }

  evalCondition(condition: string, index: number) {
    //condition: "fields[0].value === 0"
    condition = condition.split("fields[").join("this.data.items[index][")
    return eval(condition)
  }
}
