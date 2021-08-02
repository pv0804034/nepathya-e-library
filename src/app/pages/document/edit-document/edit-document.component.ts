import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { DocumentRequest } from 'src/app/models/Request/DocumentRequest';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { Tag } from 'src/app/models/Response/TagResponse';
import { DocumentService } from 'src/app/service/document/document.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { FileUploadService } from 'src/app/service/fileUpload/file-upload.service';
import { TagService } from 'src/app/service/tag/tag.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {

  submitted = false;
  @Input() title?: string;

  editDocument = new FormGroup({
    authors: new FormControl(''),
    discription: new FormControl(''),
    faculty: new FormControl(''),
    file: new FormControl(''),
    semester: new FormControl(''),
    tags: new FormControl(''),
    title: new FormControl(''),
    type: new FormControl(''),
    year: new FormControl('')
  })

  public tags: Tag[] = [];
  public faculties: FacultyResponse[] = [];
  public fileUploadUrl: String = '';
  public types: String[] = ['PROJECT', 'PROPOSAL'];
  public fileData!: File;
  public data: DocumentResponse[] = [];
  public document: DocumentResponse = new DocumentResponse();
  public loading: boolean = true;
  public selectedTag: String = "";
  constructor(protected ref: NbDialogRef<EditDocumentComponent>,
    public documentService: DocumentService,
    private toast: NbToastrService,
    private tagService: TagService,
    private facultyService: FacultyService,
    private fileUploadService: FileUploadService,
    ) { }

    
  ngOnInit(): void {
    this.getAllDocument().then(null);
    this.document = this.documentService.documentData;
    this.getAllFaculty();
    this.getAllTag();

    this.editDocument.patchValue({
      authors: this.document.type,
      discription: this.document.discription,
      faculty: null,
      file: this.document.fileUrl,
      semester: this.document.semester,
      tags: null,
      title: this.document.title,
      type: this.document.type,
      year: this.document.year
    });
  }

  public async getAllDocument(): Promise<void> {
    this.documentService.getAll().subscribe(
      (data: any) => {
        this.data = [];
        if(this.documentService.on){
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


  public getAllTag() {
    this.tagService.getAll().subscribe((data: any) => {
      this.tags = data.responseObject;
    })
  }

  public getAllFaculty() {
    this.facultyService.getAll().subscribe((data: any) => {
      this.faculties = data.responseObject;
    })
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0)
    {
      this.fileData = event.target.files[0];
    }
  }
  public request:DocumentRequest = new DocumentRequest();
  updateDocument(id){
    this.fileUploadService.uploadFile(this.fileData).subscribe(
      (event: any) => {
        this.fileUploadUrl = event.responseObject;
        this.request.discription = this.editDocument.value['discription'];
        this.request.facultyId = this.editDocument.value['faculty'];
        this.request.tags = new Array();
        this.request.tags.push(this.editDocument.value['tags']);
        this.request.fileUrl = this.fileUploadUrl.toString();
        this.request.semester = this.editDocument.value['semester'];
        this.request.authors = this.editDocument.value['authors'];
        this.request.title = this.editDocument.value['title'];
        this.request.year = this.editDocument.value['year'];
        this.request.type = this.editDocument.value['type'];
        this.request.visible = this.document.isVisible;
        this.documentService.update(id,this.request).subscribe(
          (e :any) => {
            this.getAllDocument().then(() => {
              this.toast.success(
                'Successfully Updated'
              );
              this.dismiss();
            });
          },(error) => {
            this.toast.danger( 'Unsuccessfull to update');
          }
        )
      },(error) => {
        this.toast.danger( 'Unsuccessfull to update');
      }
      );
  }
}
