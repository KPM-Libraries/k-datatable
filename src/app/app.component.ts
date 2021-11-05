import { Component } from '@angular/core';
interface DataTable {
  addData: boolean,
  type?: string,
  style?: string,
  header: Array<{ name: string, order: boolean, filter: boolean }>,
  footer?: Array<string>,
  items: Array<Array<{ type: string, content: any, style?: string }>>
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
        order: true,
        filter: true
      },
      {
        name: "Header 2",
        order: true,
        filter: false
      },
      {
        name: "Header 3",
        order: false,
        filter: true
      },
      {
        name: "Header 4",
        order: false,
        filter: false
      }
    ],
    footer: ["Footer 1", "Footer 2", "Footer 3", "Footer 4"],
    items: [
      [
        {
          type: "text",
          content: "Cel 12"
        },
        {
          type: "text",
          content: 5,
          style: "k-bg-danger"
        },
        {
          type: "list",
          content: ["rtas", "World"]
        },
        {
          type: "date",
          content: new Date('4/7/2025').toLocaleDateString()
        }
      ],
      [
        {
          type: "text",
          content: "Cel 5"
        },
        {
          type: "text",
          content: 8
        },
        {
          type: "list",
          content: ["aello"]
        },
        {
          type: "date",
          content: new Date('5/7/2019').toLocaleDateString()
        }
      ],
      [
        {
          type: "text",
          content: "Cel 1"
        },
        {
          type: "text",
          content: 1
        },
        {
          type: "list",
          content: ["Hello", "World"]
        },
        {
          type: "date",
          content: new Date().toLocaleDateString()
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
        switch (item[i]?.type) {
          case 'text':
          case 'bold':
          case 'badge':
            if (!item[i]?.content.toLowerCase().includes(this.filterTable[i].toLowerCase()))
              return false
            break
          case 'list':
            if (!this.filterInsideList(item[i]?.content, this.filterTable[i].toLowerCase()))
              return false
            break
          case 'image':
            if (!item[i]?.content?.src.includes(this.filterTable[i]))
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
          if (typeof elt1[index]?.content != typeof elt2[index]?.content)
            return -1
          switch (elt1[index]?.type) {
            case 'date':
              return (new Date(elt1[index]?.content).getTime() - new Date(elt2[index]?.content).getTime()) * this.orderStatus.ascOrDescTable[1]
            case 'list':
              return elt1[index]?.content.join('').toLowerCase() == elt2[index]?.content.join('').toLowerCase() ? 0 : elt1[index]?.content.join('').toLowerCase() < elt2[index]?.content.join('').toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
            default: //all other types
              return elt1[index]?.content.toString().toLowerCase() == elt2[index]?.content.toString().toLowerCase() ? 0 : elt1[index]?.content.toString().toLowerCase() < elt2[index]?.content.toString().toLowerCase() ? this.orderStatus.ascOrDescTable[0] : this.orderStatus.ascOrDescTable[1]
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

}
