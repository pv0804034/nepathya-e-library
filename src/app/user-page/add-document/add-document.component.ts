import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { User } from 'src/app/auth/user';
import { UserDetails } from 'src/app/auth/userDetails';
import { DocumentRequest } from 'src/app/models/Request/DocumentRequest';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { Tag } from 'src/app/models/Response/TagResponse';
import { Users } from 'src/app/models/User';
import { LoginService } from 'src/app/service/auth/login.service';
import { DocumentService } from 'src/app/service/document/document.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { FileUploadService } from 'src/app/service/fileUpload/file-upload.service';
import { TagService } from 'src/app/service/tag/tag.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  addDocumentForm = new FormGroup({
    authors: new FormControl(''),
    discription: new FormControl(''),
    faculty: new FormControl(''),
    file: new FormControl(''),
    semester: new FormControl(''),
    tags: new FormControl(''),
    title: new FormControl(''),
    type: new FormControl(''),
  })

  currentUser: any = [];
  public document: DocumentRequest = new DocumentRequest();
  public tags: Tag[] = [];
  public faculties: FacultyResponse[] = [];
  public fileUploadUrl: String = '';
  public types: String[] = ['PROJECT', 'PROPOSAL'];
  public fileData!: File;
  public ok: boolean = true;
  public userList: Users[] = [];
  
  constructor(
    private tagService: TagService,
    private facultyService: FacultyService,
    private documentService: DocumentService,
    private fileUploadService: FileUploadService,
    private loginService: LoginService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllTag();
    this.getAllFaculty();
    this.currentUser = this.loginService.getCurrentUser();
    this.getAllUser();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0){
      this.fileData = event.target.files[0];
    }
  }

  submit() {

    console.log(this.fileData)
    this.fileUploadService.uploadFile(this.fileData).subscribe(
      (event: any) => {
          alert(event.responseObject)
          this.fileUploadUrl = event.responseObject;
          this.document.discription = this.addDocumentForm.value['discription'];
          this.document.tags = new Array();
          for(let t of this.addDocumentForm.value['tags']){
            this.document.tags.push(t);
          }
          this.document.fileUrl = this.fileUploadUrl.toString();
          this.document.semester = this.addDocumentForm.value['semester'];
          this.document.authors = new Array();
          for(let a of this.addDocumentForm.value['authors']){
            this.document.authors.push(a);
          }
          this.document.title = this.addDocumentForm.value['title'];
          this.document.year = this.getYear(this.currentUser.roleName);
          this.document.facultyId = this.addDocumentForm.value['faculty'];
          this.document.type = this.addDocumentForm.value['type'];
          this.document.visible = false;
          this.document.docUploadNoticeId = this.documentService.linkId;

          this.documentService.postDocument(this.document).subscribe(
            (response: any) => {
              alert(response.responseObject)
              this.router.navigate(["/link/edit-document"])
              
            },(error) =>{
              alert("problem in upload file");
            }
          )
      },(error)=>{
        alert("problem in file upload");
      }
    );
  }

  public getAllTag() {
    this.tagService.getAll().subscribe((data: any) => {
      this.tags = data.responseObject;
      console.log(this.tags);
    })
  }

  public getAllFaculty() {
    this.facultyService.getAll().subscribe((data: any) => {
      this.faculties = data.responseObject;
      console.log(this.faculties);
    })
  }

  public getAllUser(){
    this.userService.getAllUsersByRoleName(this.currentUser.roleName).subscribe(
      (response:any) => {
        this.userList = response.responseObject;
        console.log(this.userList);
      }
    )
  }

  public getFaculty(role){
    let faculty = '';
    console.log("hair bol" + role);
    for(let i = 0;i<role.length;i++){
      if(role.charAt(i) == '_')break;
      faculty = faculty.concat(role.charAt(i));
    }
    return faculty;
  }

  public getYear(role){
    let ok = false;
    let year = '';
    for(let i = 0;i<role.length;i++){
      if(ok){
        year = year.concat(role.charAt(i));
      }
      if(role.charAt(i) == '_'){
        ok = true;
      }
    }
    return +year;
  }
}
