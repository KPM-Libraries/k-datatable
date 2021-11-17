import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KMylibComponent } from './k-mylib.component';



@NgModule({
  declarations: [
    KMylibComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    KMylibComponent
  ]
})
export class KMylibModule { }
