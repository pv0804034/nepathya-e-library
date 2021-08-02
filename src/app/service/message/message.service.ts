import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerApis } from './../../api.constants';
import { TransportService } from '../transport/transport.service';

import { MessageRequest } from 'src/app/models/Request/MessageRequest';
import { MessageResponse } from 'src/app/models/Response/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message: MessageResponse = new MessageResponse();

  constructor(private http: HttpClient, private transport: TransportService) { }

  postMessage(data: MessageRequest) {
    // console.log(data);
    return this.transport.Create<MessageRequest>(data, ServerApis.message);
  }

  getMessage(){
    return this.transport.Read<MessageResponse>(ServerApis.message);
  }

  deleteMessage(id){
    return this.transport.Delete<any>(ServerApis.message + "/" + id);
  }
}
