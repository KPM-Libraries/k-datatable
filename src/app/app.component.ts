import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  data = {
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
      {
        id: 1,
        data: [
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
        ]
      },
      {
        id: 2,
        data: [
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
        ]
      },
      {
        id: 3,
        data: [
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
        ]
      }
    ]
  }

  event(event: any) {
    console.log(event)
  }

}
