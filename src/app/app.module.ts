import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KMylibModule } from 'projects/k-mylib/src/public-api';

import { AppComponent } from './app.component';
import { KDatatableComponent } from './components/k-datatable/k-datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    KDatatableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KMylibModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
