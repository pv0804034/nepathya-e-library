import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Tag } from 'src/app/models/Response/TagResponse';
import { TagService } from 'src/app/service/tag/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  submitted = false;
  public loading: boolean = true;

  @Input() title?: string;
  public data: Tag[] = [];

  addTag = new FormGroup({
    tagName: new FormControl('', Validators.required),
  });

  constructor(
    protected ref: NbDialogRef<AddTagComponent>,
    private tagService: TagService,
    private toast: NbToastrService
    ) { }

  ngOnInit(): void {
    this.getAllTag().then(null);
  }

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

  dismiss() {
    this.ref.close();
  }

  saveTagData() {
    this.loading = true;
    this.tagService.add(this.addTag.value).subscribe(
      (response: any) => {
        this.getAllTag().then(() => {
          this.toast.success(
            'Successfully Added'
          );
          this.dismiss();
        });
      },
      (error) => {
        this.loading = false;
        this.toast.danger(error.error.responseObject.message, 'Unsuccessfull');
      }
    );
  }

}
