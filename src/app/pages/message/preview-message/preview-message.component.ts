import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-preview-message',
  templateUrl: './preview-message.component.html',
  styleUrls: ['./preview-message.component.scss']
})
export class PreviewMessageComponent implements OnInit {

  constructor(
    protected ref: NbDialogRef<PreviewMessageComponent>,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    console.log(this.messageService.message)
  }

  dismiss(){
    this.ref.close();
  }
}
