import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentRequest } from 'src/app/models/Request/DocumentRequest';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { DocumentService } from 'src/app/service/document/document.service';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.scss']
})
export class PreviewDocumentComponent implements OnInit {

  public documentId : any;
  public data: DocumentResponse = new DocumentResponse();
  public error: string = '';

  constructor(private route: ActivatedRoute,private documentService: DocumentService) { }

  getDocumentById(){
    this.documentService.getById(this.documentId).subscribe(
      (data: any) => {
        this.data = data.responseObject;
      },(error) => {
        this.error = error.error.responseObject;
      }
    );
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('document');
    this.documentId = id;
    //console.log(this.documentId);
    this.getDocumentById();
    console.log(this.error);
  }

}
