import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CreateLink } from 'src/app/models/Request/CreateLink';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { LoginService } from 'src/app/service/auth/login.service';
import { CreateLinkService } from 'src/app/service/createLink/create-link.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';

@Component({
  selector: 'app-add-create-link',
  templateUrl: './add-create-link.component.html',
  styleUrls: ['./add-create-link.component.scss']
})
export class AddCreateLinkComponent implements OnInit {

  public faculties: FacultyResponse[] = [];
  public toggle = true;

  addLink = new FormGroup({
    title: new FormControl(''),
    faculty: new FormControl(''),
    year: new FormControl(''),
    isActive: new FormControl(''),
    expireTime: new FormControl('')

  })

  constructor(
    protected ref: NbDialogRef<AddCreateLinkComponent>,
    private facultyService: FacultyService,
    private toast: NbToastrService,
    private loginService: LoginService,
    private createLinkService: CreateLinkService,

  ) { }

  ngOnInit(): void {
    this.getAllFaculty();
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

  saveLink(){
    const createLink = new CreateLink();
    createLink.expireTime = this.addLink.value.expireTime;
    createLink.year = this.addLink.value.year;
    createLink.facultyId = this.addLink.value.faculty;
    createLink.isActive = this.toggle;
    createLink.title = this.addLink.value.title;
    console.log(createLink);
    this.createLinkService.add(createLink).subscribe((response:any)=>{
      this.toast.success('successfully added')
      this.dismiss();
    },(error) => {
      this.toast.danger("unsuccessfull")
    })
  }

  click(){
    this.toggle = !this.toggle;
  }


}
