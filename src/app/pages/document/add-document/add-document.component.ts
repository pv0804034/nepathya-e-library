import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { DocumentRequest } from 'src/app/models/Request/DocumentRequest';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { Tag } from 'src/app/models/Response/TagResponse';
import { DocumentService } from 'src/app/service/document/document.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { FileUploadService } from 'src/app/service/fileUpload/file-upload.service';
import { TagService } from 'src/app/service/tag/tag.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  submitted = false;
  public loading: boolean = true;
  public ok: boolean = true;

  public data: DocumentResponse[] = [];

  addDocument = new FormGroup({
    authors: new FormControl(''),
    discription: new FormControl(''),
    faculty: new FormControl(''),
    file: new FormControl(''),
    semester: new FormControl(''),
    tags: new FormControl(''),
    title: new FormControl(''),
    type: new FormControl(''),
  })

  public document: DocumentRequest = new DocumentRequest();
  public tags: Tag[] = [];
  public faculties: FacultyResponse[] = [];
  public fileUploadUrl: String = '';
  public types: String[] = ['PROJECT', 'PROPOSAL'];
  public fileData!: File;
  
  public async getAllDocument(): Promise<void> {
    this.documentService.getAll().subscribe(
      (data: any) => {
        // this.data = data.responseObject;
        if(this.ok){
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
        //console.log(data);
        this.loading = false;
      },
      (error) => {
        this.toast.danger(
          'Unsuccessful');
      }
    );
  }

  constructor(
    protected ref: NbDialogRef<AddDocumentComponent>,
    private documentService: DocumentService,
    private tagService: TagService,
    private facultyService: FacultyService,
    private fileUploadService: FileUploadService,
    private toast: NbToastrService) { }

  ngOnInit(): void {
    this.getAllDocument().then(null);
    this.getAllFaculty();
    this.getAllTag();
  }

  dismiss(){
    this.ref.close();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0)
    {
      this.fileData = event.target.files[0];
    }
  }
  
  saveDocument(){
    this.fileUploadService.uploadFile(this.fileData).subscribe(
      (event: any) => {
        this.fileUploadUrl = event.responseObject;
        this.ok = event.success;
        if (this.ok)
        {
          this.document.discription = this.addDocument.value['discription'];
          this.document.facultyId = this.addDocument.value['faculty'];
          this.document.tags = new Array();
          for (const t of this.addDocument.value['tags']){
            this.document.tags.push(t);
          }
          // this.document.tags.push(this.addDocument.value['tags']);
          this.document.fileUrl = this.fileUploadUrl.toString();
          this.document.semester = this.addDocument.value['semester'];
          this.document.authors = this.addDocument.value['authors'];
          this.document.title = this.addDocument.value['title'];
          this.document.year = this.addDocument.value['year'];
          this.document.type = this.addDocument.value['type'];
          this.document.visible = true;
          console.log(this.document);
          this.documentService.postDocument(this.document).subscribe(
            (response: any) => {
              this.getAllDocument().then(() => {
                this.toast.success(
                  'Successfully Added'
                );
                this.dismiss();
              });
            },(error) => {
              this.loading = false;
              this.toast.danger( 'Unsuccessfull');
            }
          )
        }
      },(error) => {
        this.loading = false;
        this.toast.danger( 'Unsuccessfull');
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
}
