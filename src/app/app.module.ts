import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KDatatableModule } from 'projects/k-mylib/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    KDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
