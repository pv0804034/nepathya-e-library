import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { DocumentService } from 'src/app/service/document/document.service';
import { AddDocumentComponent } from './add-document/add-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { PreviewDocumentComponent } from './preview-document/preview-document.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public data: DocumentResponse[] = [];
  public loading: boolean = true;
  public approved: boolean = false;
  public unapproved: boolean = false;
  
  constructor(private router: Router,private dialogService: NbDialogService,private toast: NbToastrService, private documentService: DocumentService) { }

  public async getAllDocument(): Promise<void> {
    this.documentService.getAll().subscribe(
      (data: any) => {
        // this.data = data.responseObject;
        if(this.approved){
          for(const d of data.responseObject){
            if(d.visible){
              this.data.push(d);
            }
          }
        }else{
          for(const d of data.responseObject){
            if(!d.visible){
              this.data.push(d);
            }
          }
        }
        console.log(data);
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }
  ngOnInit(): void {
    this.getAllDocument().then(null);
  }

  createDocument(){
    this.dialogService.open(AddDocumentComponent).onClose.subscribe(
      () => {
        this.data = [];
        this.getAllDocument();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
      }
    );
  }

  changeVisibility(d){
    this.documentService.makeVisible(d.id).subscribe(() => {
      this.data = [];
      this.getAllDocument();
    },
    (error) => {
      this.toast.danger(error.error.responseObject.message, 'Unsuccessful');
    }
    )
  }

  editDocument(d){
    
    this.documentService.documentData = d;
    this.documentService.off = this.unapproved;
    this.documentService.on = this.approved;
    this.dialogService
      .open(EditDocumentComponent, {
        context: {
          title: 'Update Document',
        },
      })
      .onClose.subscribe(() => {
        this.data = [];
        this.getAllDocument();
      });
  }

  onDelete(id){
    Swal.fire({
      title:
        '<span style="color:#ffffff; font-size: 1.5rem; font-weight: 600;">Are you sure?</span>',
      icon: 'warning',
      iconColor: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#EFF2F8',
      cancelButtonColor: '#FF3D71',
      confirmButtonText: '<span style="color:#000000">Delete</span>',
      background: '#588C7F',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteDocument(id).subscribe(
          () => {
            this.data = [];
            this.getAllDocument().then(() => {
              this.toast.success(
                'Successfully Deleted'
              );
              this.loading = false;
            });
          },
          (error) => {
            this.loading = false;
            this.toast.danger('Unsuccessful To Delete');
          }
        );
      }
    });
  }

  visibility(){
    this.data = [];
    this.getAllDocument();
  }

  approvedChange(){
    this.approved = true;
    this.unapproved = false;
    this.visibility();
  }

  unapprovedChange(){
    this.approved = false;
    this.unapproved = true;
    this.visibility();
  }

  previewDocument(d){
    this.documentService.documentData = d;
    this.dialogService.open(PreviewDocumentComponent);
  }
}
