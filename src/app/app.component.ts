import { isNgTemplate } from '@angular/compiler';
import { Component, IterableDiffers } from '@angular/core';
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
          content: "Cel 1"
        },
        {
          type: "badge",
          content: "Cel 2",
          style: "k-bg-danger"
        },
        {
          type: "bold",
          content: "Cel 3"
        },
        {
          type: "image",
          content: {
            src: "https://cdn.pixabay.com/photo/2020/08/25/11/32/monstera-5516509__340.png",
            width: 100,
            height: 100
          }
        }
      ],
      [
        {
          type: "text",
          content: "Cel 5"
        },
        {
          type: "text",
          content: "Cel 6"
        },
        {
          type: "list",
          content: ["Hello", "World"]
        },
        {
          type: "text",
          content: "Cel 8"
        }
      ]
    ]
  }

  filterTable = new Array(this.data?.header?.length)

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

}
