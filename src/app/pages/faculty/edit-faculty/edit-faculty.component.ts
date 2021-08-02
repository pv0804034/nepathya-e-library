import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { FacultyService } from 'src/app/service/faculty/faculty.service';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.scss']
})
export class EditFacultyComponent implements OnInit {

  submitted = false;
  @Input() title?: string;

  constructor(
    protected ref: NbDialogRef<EditFacultyComponent>,
    public facultyService: FacultyService,
    private toast: NbToastrService
  ) { }

  public faculties: FacultyResponse[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.getAllFaculty().then(null);
  }

  public async getAllFaculty(): Promise<void> {
    this.facultyService.getAll().subscribe(
      (data: any) => {
        this.faculties = data.responseObject;
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

  updateFaculty(id, facultyForm: NgForm) {
    this.facultyService.update(id, facultyForm.value).subscribe(
      () => {
        this.getAllFaculty().then(() => {
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
