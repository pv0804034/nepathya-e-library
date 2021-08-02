import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { CreateLink } from 'src/app/models/Request/CreateLink';
import { CreateLinkResponse } from 'src/app/models/Response/CreateLinkResponse';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CreateLinkService {

  public data = new CreateLinkResponse();
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient, private transportServie: TransportService) { }

  getAllActive(){
    return this.http.get(ServerApis.createLink+"/active");
  }

  getAllInactive(){
    return this.http.get(ServerApis.createLink+"/inactive");
  }

  add(createLink: CreateLink){
    return this.transportServie.Create(createLink,ServerApis.createLink);
  }

  update(id,createLink: CreateLink){
    return this.http.put(ServerApis.createLink + "/{id}?id="+id,createLink,this.httpOptions);
  }
}
