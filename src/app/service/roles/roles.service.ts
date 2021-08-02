import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerApis } from 'src/app/api.constants';
import { Roles } from 'src/app/models/Role';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  RoleData: Roles = new Roles();
  constructor(private transportService: TransportService, public httpClient: HttpClient) { }


  getAllRoles() {
    return this.transportService.Read(ServerApis.rolesUrl);
  }

  createRoles(data: Roles){
    return this.transportService.Create<Roles>( data, ServerApis.rolesUrl);
  }

  deleteRole(id: number) {
  return this.transportService.Delete(ServerApis.rolesUrl + "/" + id );
  }

  updateRole(id, data): Observable<Roles> {
    return this.httpClient.put(ServerApis.rolesUrl + "/" + id, data);
  }
}
