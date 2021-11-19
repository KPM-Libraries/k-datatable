# K Datatable Package

An Angular package that allows you to create your table and filter, order and show your data into multiple pages.

## Install

To install this library with npm, run below command:

`npm k-datatable`

Then import KMylibModule module in your app.module.ts

```
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

First prépare your data in your component TS file

```
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

Then add ```<lib-k-mylib>``` component to your component HTML file
  
```
<lib-k-mylib [data]="data" (event)="event($event)"></lib-k-mylib>
```

## Demo

<a href="http://localhost:4200/">Stackblitz</a>

## npmjs

<a href="http://localhost:4200/">npmjs</a>

## Style
