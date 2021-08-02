import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DocumentService } from 'src/app/service/document/document.service';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.scss']
})
export class PreviewDocumentComponent implements OnInit {

  constructor(protected ref: NbDialogRef<PreviewDocumentComponent>, public documentService: DocumentService) { }

  ngOnInit(): void {
  }

  dismiss(){
    this.ref.close();
  }
}
