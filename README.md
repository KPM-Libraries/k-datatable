# K Datatable Package

An Angular package that allows you to create your table and filter, order and show your data into multiple pages.

## Install

To install this library with npm, run below command:

`npm k-datatable`

Then import KMylibModule module in your app.module.ts

```ts
import { KMylibModule } from 'projects/k-mylib/src/public-api';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    KMylibModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Setup your component as below :

First prepare your data in your component TS file

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  // Your JSON data
  jsonData = [
    {
        "id": "619789b2fa489d7014d5c263",
        "reference": 829251,
        "name": "Stevenson Reid",
        "createdAt": "Sat Nov 14 1987 10:55:59 GMT+0100 (UTC+01:00)"
    },
    {
        "id": "619789b2e138b5f384b8277e",
        "reference": 694281,
        "name": "Banks Whitley",
        "createdAt": "Sun Nov 15 1992 12:42:53 GMT+0100 (UTC+01:00)"
    },
    {
        "id": "619789b2d5bdffbb30b1ef82",
        "reference": 884637,
        "name": "Carla Faulkner",
        "createdAt": "Wed Feb 15 2012 14:27:52 GMT+0100 (UTC+01:00)"
    }
  ]
  
  // Initialize data table data
  data = {
    addItem: true,
    header: [
      {
        name: "Reference",
        type: "number",
        order: true,
        filter: false
      },
      {
        name: "Name",
        type: "text",
        order: false,
        filter: true
      },
      {
        name: "Created at",
        type: "date",
        order: true,
        filter: true
      },
      {
        type: "buttons",
        order: false,
        filter: false
      }
    ],
    footer: ["Reference", "Name", "Created at", ""],
    items: new Array()
  }

  constructor() { }

  ngOnInit(): void {
    // Initialize data table with your json data
    for (let i of this.jsonData) {
      this.data.items.push({
        inputData: item,
        data: [
          {
            content: item?.reference,
          },
          {
            content: item?.name
          },
          {
            content: {
              value: new Date(item?.createdAt).toLocaleDateString("en-En"),
              date: new Date(item?.createdAt)
            }
          },
          {
            content: [
              {
                title: "Update",
                event: "update"
              },
              {
                title: "Delete",
                event: "delete"
              }
            ]
          }
        ]
      })
    }
    
  }
  
  // Declare your data table event function
  event(event: any) {
    switch (event?.name) {
      case 'add':
        //add a new item to your json object
        break;
      case 'update':
        // update an item from your json object
        // use event?.outputData to get item data
        break;
      case 'delete':
        // delete an item from your json object
        // use event?.outputData to get item data
        break;
    }
  }

}
```

Then add ```<lib-k-mylib>``` component to your component HTML file
  
```html
<lib-k-mylib [data]="data" (event)="event($event)"></lib-k-mylib>
```

## Options

## Data options

## Translation

Option | Description | Values
--- | --- | --- |
add | Add button title | String 
--- | --- | --- |
filter | Filter button title | String 
--- | --- | --- |
allItems | All items select option text | String 
--- | --- | --- |
totalItems | Total number of items text | String 
--- | --- | --- |
show | Show items select field text | String 

## Demo

<a href="http://localhost:4200/">Stackblitz</a>

## npmjs

<a href="http://localhost:4200/">npmjs</a>

## Style
