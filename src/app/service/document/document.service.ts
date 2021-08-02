import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { DocumentRequest } from 'src/app/models/Request/DocumentRequest';
import { DocumentResponse } from 'src/app/models/Response/DocumentResponse';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentData = new DocumentResponse();
  public on = false;
  public off = false; 
  public linkId;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient, private transportService: TransportService) { }

  getAll(){
    return this.http.get(ServerApis.documentUrl);
  }

  getById(id:any){
    return this.http.get(ServerApis.documentUrl + '/{id}?documentId=' + id);
  }

  add(document : DocumentRequest){
    return this.transportService.Create(document,ServerApis.documentUrl);
  }

  update(id, data) {
    return this.http.put(ServerApis.documentUrl + "/{id}?documentId=" + id, data,this.httpOptions);
  }

  getAllDocumentByTag(tagId: any) {
    return this.http.get(ServerApis.getAllDocumentByTag + tagId);
  }
  
  postDocument(document: DocumentRequest) {
    return this.transportService.Create(document,ServerApis.documentUrl);
  }

  makeVisible(id){
    console.log(id);
    return this.http.put(ServerApis.documentUrl + '/{documentId}?documentId=' + id,null,this.httpOptions);
  }

  deleteDocument(id){
    return this.http.delete(ServerApis.documentUrl+ '/{documentId}?documentId=' + id);
  }

  getByDocumentLinkIdAndAuthor(id,userId){
    return this.http.get(ServerApis.documentUrl + `/{linkId}/{authorId}?authorId=${userId}&linkId=${id}`);
  }
  
}
