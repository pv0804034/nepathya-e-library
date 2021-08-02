import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  constructor(private http: HttpClient,private transportService: TransportService) { }

   uploadFile(file: File) {
    const formData:FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(ServerApis.fileUpload, formData);
  }
  
  public downloadFile(uri) : Observable < Blob > {
    return this.http.get(uri, { responseType: 'blob' });
  }


}
