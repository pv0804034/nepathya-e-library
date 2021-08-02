import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { FacultyService } from 'src/app/service/faculty/faculty.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {

  submitted = false;
  public loading: boolean = true;

  @Input() title?: string;
  public data: FacultyResponse[] = [];

  addFaculty = new FormGroup({
    facultyName: new FormControl('', Validators.required),
  });

  constructor(
    protected ref: NbDialogRef<AddFacultyComponent>,
    private facultyService: FacultyService,
    private toast: NbToastrService
    ) { }

  ngOnInit(): void {
    this.getAllFaculty().then(null);
  }

  public async getAllFaculty(): Promise<void> {
    this.facultyService.getAll().subscribe(
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
    this.facultyService.add(this.addFaculty.value).subscribe(
      (response: any) => {
        this.getAllFaculty().then(() => {
          this.toast.success(
            'Successfully Added'
          );
          this.dismiss();
        });
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.toast.danger(error.error.responseObject.message, 'Unsuccessfull');
      }
    );
  }

}
