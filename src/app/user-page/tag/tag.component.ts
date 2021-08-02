import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/Response/TagResponse';
import { TagService } from 'src/app/service/tag/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public data: Tag[] = [];

  constructor(private router: Router, private tag: TagService) { }

  public getAllTag() {
    this.tag.getAll().subscribe((data: any) => {
      this.data = data.responseObject;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.getAllTag();
  }

  onSelect(d: any) {
    this.router.navigate(['/home/tag', d.tagId]);
  }

}
