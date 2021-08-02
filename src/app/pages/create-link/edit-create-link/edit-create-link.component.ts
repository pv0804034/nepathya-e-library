import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CreateLink } from 'src/app/models/Request/CreateLink';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { LoginService } from 'src/app/service/auth/login.service';
import { CreateLinkService } from 'src/app/service/createLink/create-link.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';

@Component({
  selector: 'app-edit-create-link',
  templateUrl: './edit-create-link.component.html',
  styleUrls: ['./edit-create-link.component.scss']
})
export class EditCreateLinkComponent implements OnInit {

  public faculties: FacultyResponse[] = [];
  public toggle:Boolean|undefined = true;
  public data:any;
  
  constructor(protected ref: NbDialogRef<EditCreateLinkComponent>,
    private toast: NbToastrService,
    private facultyService: FacultyService,
    private createLinkService: CreateLinkService,
    private loginService: LoginService) {
      this.toggle = this.createLinkService.data.isActive;
     }

  editForm = new FormGroup({
    title: new FormControl(''),
    faculty: new FormControl(''),
    year: new FormControl(''),
    isActive: new FormControl(''),
    expireTime: new FormControl('')
  })

  ngOnInit(): void {
    this.getAllFaculty();
    console.log( this.createLinkService.data);
    this.data = this.createLinkService.data;
  }

  dismiss(){
    this.ref.close();
  }

  public getAllFaculty() {
    this.facultyService.getAll().subscribe((data: any) => {
      this.faculties = data.responseObject;
      console.log(this.faculties);
    })
  }

  onEdit(){
    const createLink = new CreateLink();
    createLink.expireTime = this.editForm.value.expireTime;
    createLink.year = this.editForm.value.year;
    createLink.facultyId = this.editForm.value.faculty;
    createLink.isActive = (this.toggle == undefined ? true:this.toggle == true?true:false);
    createLink.title = this.editForm.value.title;
    console.log(createLink);
    this.createLinkService.update(this.createLinkService.data.id,createLink).subscribe((response) => {
      this.toast.success("successful");
      this.ref.close();
    },(errror)=>{
      this.toast.danger("unsuccessful");
      this.ref.close();
    })
  }

  click(){
    this.toggle = !this.toggle;
  }
}
