import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KDatatableComponent } from './k-datatable.component';



@NgModule({
  declarations: [
    KDatatableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    KDatatableComponent
  ]
})
export class KDatatableModule { }
