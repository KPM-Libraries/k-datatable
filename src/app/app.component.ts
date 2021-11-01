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
          value: "Cel 1"
        },
        {
          type: "text",
          value: "Cel 2"
        },
        {
          type: "bold",
          value: "Cel 3"
        },
        {
          type: "image",
          value: "https://cdn.pixabay.com/photo/2020/08/25/11/32/monstera-5516509__340.png",
          width: 100,
          height: 100
        }
      ],
      [
        {
          type: "text",
          value: "Cel 5"
        },
        {
          type: "text",
          value: "Cel 6"
        },
        {
          type: "text",
          value: "Cel 7"
        },
        {
          type: "text",
          value: "Cel 8"
        }
      ]
    ]
  }

}
