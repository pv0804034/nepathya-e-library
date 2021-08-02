import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerApis } from 'src/app/api.constants';
import { UserRequest } from 'src/app/models/Request/UserRequest';
import { Users } from 'src/app/models/User';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  };
  
  UserData: Users = new Users();

  constructor(
    private transportService: TransportService,
    public httpClient: HttpClient
  ) {}

  getAllUsers() {
    return this.transportService.Read(ServerApis.usersUrl);
  }

  createUser(data: UserRequest) {
    return this.transportService.Create<Users>(data, ServerApis.usersUrl);
  }

  deleteUser(id: number) {
    return this.transportService.Delete(ServerApis.usersUrl + '/' + id);
  }

  updateUser(id, data) {
    return this.httpClient.put(ServerApis.usersUrl + '/' + id, data);
  }

  change(id){
    return this.httpClient.put(ServerApis.usersUrl + "/change?id=" + id,null,this.httpOptions);
  }

  getAllUsersByRoleName(role){
    return this.httpClient.get(ServerApis.usersUrl + `/{roleName}?roleName=` + role);
  }
}
