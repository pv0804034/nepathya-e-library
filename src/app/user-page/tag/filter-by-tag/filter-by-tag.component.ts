import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { DocumentService } from 'src/app/service/document/document.service';

@Component({
  selector: 'app-filter-by-tag',
  templateUrl: './filter-by-tag.component.html',
  styleUrls: ['./filter-by-tag.component.scss']
})
export class FilterByTagComponent implements OnInit {

  public tagId: any;
  public data: DocumentResponse[] = [];

  constructor(private router: Router,private route: ActivatedRoute, private document: DocumentService) { }

  public getAllDocuments() {
    this.document.getAllDocumentByTag(this.tagId).subscribe((data: any) => {
      this.data = data.responseObject;
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('tag');
    this.tagId = id;
    this.getAllDocuments();
  }

  preview(d){
    this.router.navigate(['/home/document',d.id]);
  }

}
