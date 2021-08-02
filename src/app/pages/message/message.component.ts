import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastRef, NbToastrService } from '@nebular/theme';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';
import { MessageService } from 'src/app/service/message/message.service';
import { PreviewMessageComponent } from './preview-message/preview-message.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages:MessageResponse[] = [];

  constructor(
    private messageService: MessageService,
    private toster: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.getAllMessage();
    console.log(this.messages);
  }

  onReply(d){}

  previewMessage(d){
    this.messageService.message = d;
    console.log(d);
    this.dialogService.open(PreviewMessageComponent);
  }

  getAllMessage(){
    this.messageService.getMessage().subscribe(
      (response:any) => {
        this.messages = response.responseObject;
      },(error) => {
        this.toster.danger("unsuccessful to get message");
      }
    )
  }

  delete(d){
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
        this.messageService.deleteMessage(d.messageId).subscribe(
          () => {
            this.messages = [];
            this.getAllMessage();
              this.toster.success(
                'Successfully Deleted'
              );
          },
          (error) => {
            this.toster.danger('Unsuccessful To Delete');
          }
        );
      }
    });
  }
}
