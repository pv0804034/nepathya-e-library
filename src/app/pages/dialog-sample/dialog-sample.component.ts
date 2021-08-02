import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-sample',
  templateUrl: './dialog-sample.component.html',
  styleUrls: ['./dialog-sample.component.scss']
})
export class DialogSampleComponent implements OnInit {

  gridData?: any[];
  isEdit?: boolean;

  columnData = [
    {field: 'id', header: 'S.N'},
    {field: 'name', header: 'User Name'},
    {field: 'email', header: 'Email'},
    {field: 'phone', header: 'Phone'},
    {field: 'website', header: 'Website'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
