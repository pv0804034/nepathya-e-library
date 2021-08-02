import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { DocumentService } from 'src/app/service/document/document.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: DocumentResponse[] = [];

  constructor(private router: Router,private documentService: DocumentService) { }

  public async getAllDocument(): Promise<void> {
    this.documentService.getAll().subscribe(
      (data: any) => {
        for(const d of data.responseObject){
          if(d.visible){
            this.data.push(d);
          }
        }
      }
    );
  }
  ngOnInit(): void {
    this.getAllDocument();
  }

  preview(d){
    this.router.navigate(['/home/document',d.id]);
  }
}
