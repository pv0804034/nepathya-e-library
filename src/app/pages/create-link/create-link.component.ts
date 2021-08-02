import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CreateLinkResponse } from 'src/app/models/Response/CreateLinkResponse';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { CreateLinkService } from 'src/app/service/createLink/create-link.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { AddCreateLinkComponent } from './add-create-link/add-create-link.component';
import { EditCreateLinkComponent } from './edit-create-link/edit-create-link.component';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.scss']
})
export class CreateLinkComponent implements OnInit {

  public linkData: CreateLinkResponse[] = [];
  public active = true;

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private toast: NbToastrService,
    private facultyService: FacultyService,
    private createLinkService: CreateLinkService,
  ) { }

  ngOnInit(): void {
    this.approvedChange();
  }

  onDelete(){}

  editLink(d){
    this.createLinkService.data = d;
    this.dialogService.open(EditCreateLinkComponent).onClose.subscribe(
      () => {
        this.linkData = [];
        if(this.active)
          this.getAllActiveLink();
        else this.getAllInActiveLink();
        // this.data = [];
        // this.getAllDocument();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  change(){}

  approvedChange(){
    this.linkData = [];
    this.getAllActiveLink();
    this.active = true;
  }

  unapprovedChange(){
    this.linkData = [];
    this.getAllInActiveLink();
    this.active = false;
  }

  createLink(){
    this.dialogService.open(AddCreateLinkComponent).onClose.subscribe(
      () => {
        this.linkData = [];
        if(this.active)
          this.getAllActiveLink();
        else this.getAllInActiveLink();
        // this.data = [];
        // this.getAllDocument();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  public getAllActiveLink() {
    this.createLinkService.getAllActive().subscribe((data: any) => {
      this.linkData = [];
      this.linkData = data.responseObject;
      console.log(this.linkData);
    },(error) => {
      this.toast.danger('unsuccessful');
    })
  }

  public getAllInActiveLink(){
    this.createLinkService.getAllInactive().subscribe((data: any) => {
      this.linkData = [];
      this.linkData = data.responseObject;
    },(error) => {
      this.toast.danger('unsuccessful');
    })
  }

}
