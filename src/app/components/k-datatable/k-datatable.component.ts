import { Component, OnInit } from '@angular/core';

interface DataTable {
  addData: boolean,
  type?: string,
  style?: string,
  header: Array<{ name: string, type: string, order: boolean, filter: boolean }>,
  footer?: Array<string>,
  items: Array<Array<{ value: any, style?: string, src?: string, width?: string, height?: string, condition?: string }>>
}

@Component({
  selector: 'app-k-datatable',
  templateUrl: './k-datatable.component.html',
  styleUrls: ['./k-datatable.component.scss']
})

export class KDatatableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
