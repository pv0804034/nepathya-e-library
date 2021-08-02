import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageRequest } from 'src/app/models/Request/MessageRequest';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private message: MessageService ) { }

  formData: MessageRequest = new MessageRequest();

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    this.formData.email = data.controls['email'].value;
    this.formData.fullName = data.controls['fullname'].value;
    this.formData.message = data.controls['message'].value;
    this.message.postMessage(this.formData).subscribe(() => {
      window.alert("successfull");
    },(error)=>{
      alert("unsuccessful");
    }
    );
  }

}
