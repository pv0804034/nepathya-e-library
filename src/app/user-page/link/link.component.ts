import { Component, OnInit } from '@angular/core';
import { CreateLinkResponse } from 'src/app/models/Response/CreateLinkResponse';
import { LoginService } from 'src/app/service/auth/login.service';
import { CreateLinkService } from 'src/app/service/createLink/create-link.service';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document/document.service';
import { UserDetails } from 'src/app/auth/userDetails';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  linkData: CreateLinkResponse[] = [];
  user: any = [];

  constructor(private router: Router,private createLinkService: CreateLinkService,private loginService: LoginService,private docuemntService: DocumentService) { }

  ngOnInit(): void {
    this.getAllLink();
    this.user = this.loginService.getCurrentUser();
  }

  getAllLink(){
    this.createLinkService.getAllActive().subscribe(
      (response:any)=>{
        this.linkData = response.responseObject;
        console.log(this.linkData);
      },(error) =>{
        alert("error");
      }
    )
  }

  checkRole(faculty, year){
    return this.user.roleName == faculty + "_" + year;
  }

  openUploadForm(id){
    this.docuemntService.linkId = id;
    console.log(id);
    //localStorage.setItem("linkId",id);
    console.log(this.user.userId);
    let data = [];
    this.docuemntService.getByDocumentLinkIdAndAuthor(id,this.user.userId).subscribe(
      (response:any)=>{
        console.log(response);
        if(response.responseObject == null){
          this.router.navigate(["/link/add-document"]);
        }else{
          this.router.navigate(["/profile"]);
        }
      },(error) =>{
        alert("error occured")
      }
    )
    
  }

}
