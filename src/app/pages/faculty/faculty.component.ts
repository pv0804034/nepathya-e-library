import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  public data: FacultyResponse[] = [];
  public loading: boolean = true;

  constructor(private router: Router, private facultyService: FacultyService,private dialogService: NbDialogService,private toast: NbToastrService) { }

  public async getAllTag(): Promise<void> {
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

  ngOnInit(): void {
    this.getAllTag().then(null);
  }

  // onSelect(d: any) {
  //   this.router.navigate(['/home', d.tagId]);
  // }

  createFaculty(){
    this.dialogService.open(AddFacultyComponent).onClose.subscribe(
      () => {
        this.getAllTag();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  public editFaculty(faculty: FacultyResponse): void {
    this.facultyService.facultyData = faculty;
    this.dialogService
      .open(EditFacultyComponent, {
        context: {
          title: 'Update Faculty',
        },
      })
      .onClose.subscribe(() => {
        this.getAllTag();
      });
  }
}
