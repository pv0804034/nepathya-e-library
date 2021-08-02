import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-custom-table',
  templateUrl: './common-custom-table.component.html',
  styleUrls: ['./common-custom-table.component.scss']
})
export class CommonCustomTableComponent implements OnInit {

  @Input() gridData: any;
  @Input() columnData: any;
  
  ngOnInit(): void {
  }

}
