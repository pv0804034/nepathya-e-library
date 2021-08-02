import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/Response/TagResponse';
import { TagService } from 'src/app/service/tag/tag.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddTagComponent } from './add-tag/add-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public data: Tag[] = [];
  public loading: boolean = true;

  constructor(private router: Router, private tagService: TagService,private dialogService: NbDialogService,private toast: NbToastrService) { }

  public async getAllTag(): Promise<void> {
    this.tagService.getAll().subscribe(
      (data: any) => {
        this.data = data.responseObject;
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  ngOnInit(): void {
    this.getAllTag().then(null);
  }

  // onSelect(d: any) {
  //   this.router.navigate(['/home', d.tagId]);
  // }

  createTag(){
    this.dialogService.open(AddTagComponent).onClose.subscribe(
      () => {
        this.getAllTag();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  public editTag(tag: Tag): void {
    this.tagService.tagData = tag;
    this.dialogService
      .open(EditTagComponent, {
        context: {
          title: 'Update Tag',
        },
      })
      .onClose.subscribe(() => {
        this.getAllTag();
      });
  }
}
