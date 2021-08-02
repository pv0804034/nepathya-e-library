import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { FacultyRequest } from 'src/app/models/Request/FacultyRequest';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  public facultyData = new FacultyResponse();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient, private transportService: TransportService) { }

  getAll(){
    return this.http.get(ServerApis.facultyUrl);
  }

  getById(){

  }

  add(faculty : FacultyRequest){
    return this.transportService.Create(faculty,ServerApis.facultyUrl);
  }

  update(id, data) {
    return this.http.put(ServerApis.facultyUrl + "/" + id, data);
  }
}
