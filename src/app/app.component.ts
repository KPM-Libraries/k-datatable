import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
    for (let item of this.jsonData) {
      this.data.items.push({
        id: item.id,
        data: [
          {
            content: item.id,
          },
          {
            content: item.name
          },
          {
            content: {
              value: new Date(`02/05/2022`).toLocaleDateString("en-En"),
              date: new Date(`02/17/2022`)
            }
          },
          {
            content: item.phone
          },
          {
            content: {
              value: item.website,
              url: `https://${item.website}`
            }
          },
          {
            content: [
              {
                styleClass: "fa fa-file k-color-success",
                title: "Ouvrir",
                event: "read"
              },
              {
                styleClass: "fa fa-edit k-color-primary",
                title: "Modifier",
                event: "update"
              },
              {
                styleClass: "fa fa-trash k-color-danger",
                title: "Supprimer",
                event: "delete"
              }
            ]
          }
        ]
      })
    }
  }

  data = {
    translation: {
      add: 'Ajouter',
      filter: 'Filtrer',
      allItems: 'Tous'
    },
    addItem: true,
    header: [
      {
        name: "#",
        type: "number",
        order: true,
        filter: true
      },
      {
        name: "Nom",
        type: "badge",
        order: true,
        filter: true
      },
      {
        name: "Email",
        type: "date",
        order: true,
        filter: true
      },
      {
        name: "Téléphone",
        type: "progress",
        order: true,
        filter: true
      },
      {
        name: "Site Web",
        type: "link",
        order: true,
        filter: true
      },
      {
        name: "",
        type: "mini-buttons",
        order: false,
        filter: false
      }
    ],
    footer: ["#", "Nom", "Email", "Téléphone", "Site Web", "Actions"],
    items: new Array()
  }



  event(event: any) {
    console.log(event)
  }

  jsonData = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": 55,
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": 90,
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": 15,
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    }
  ]
}
