import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };

  private httpRawOptions = {
    headers: new HttpHeaders({}),
  };

  constructor(private http: HttpClient) {
  }
  public urlMaker(url: string): string {
    return environment.api + url;
  }

  public Create<T>(object: object, url: string): Observable<T> {
    return this.http.post<T>(url,
      JSON.stringify(object), this.httpOptions,
    );
  }

  public CreateRaw<T>(object: object, url: string): Observable<T> {
    return this.http.post<T>(url, object, this.httpRawOptions);
  }

  public Read<T>(url: string, responseType?: Object): Observable<T> {
    return this.http.get<T>(url, responseType);
  }

  public Update<T>(object: object, url: string): Observable<T> {
    return this.http.patch<T>(url, JSON.stringify(object), this.httpOptions);
  }

  public Delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, this.httpOptions);
  }

}
