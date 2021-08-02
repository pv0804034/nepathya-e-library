import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TagRequest } from 'src/app/models/Request/TagRequest';
import { Tag } from 'src/app/models/Response/TagResponse';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  public tagData = new Tag();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient, private transportService: TransportService) { }

  getAll(){
    return this.http.get(ServerApis.tagUrl);
  }

  getById(){

  }

  add(tag : TagRequest){
    return this.transportService.Create(tag,ServerApis.tagUrl);
  }

  update(id, data) {
    return this.http.put(ServerApis.tagUrl + "/" + id, data);
  }
}
