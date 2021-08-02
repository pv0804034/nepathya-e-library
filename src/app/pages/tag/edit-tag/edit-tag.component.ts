import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/service/tag/tag.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Tag } from 'src/app/models/Response/TagResponse';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit {

  submitted = false;
  @Input() title?: string;

  constructor(
    protected ref: NbDialogRef<EditTagComponent>,
    public tagService: TagService,
    private toast: NbToastrService
  ) { }

  public tags: Tag[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.getAllTag().then(null);
  }

  public async getAllTag(): Promise<void> {
    this.tagService.getAll().subscribe(
      (data: any) => {
        this.tags = data.responseObject;
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  dismiss() {
    this.ref.close();
  }

  updateTag(id, tagForm: NgForm) {
    this.tagService.update(id, tagForm.value).subscribe(
      () => {
        this.getAllTag().then(() => {
          this.toast.success(
            'Successfully Updated'
          );
          this.dismiss();
        });
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessfull to update');
      }
    );
  }

}
