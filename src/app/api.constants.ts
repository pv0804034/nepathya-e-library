import { environment } from './../environments/environment';

export const ServerApis = {
  userLoginURL: `${environment.api}/login`,
  rolesUrl: `${environment.api}/roles`,
  usersUrl: `${environment.api}/users`,
  settingUrl: `${environment.api}/settings`,
  tagUrl: `${environment.api}/tag`,
  facultyUrl: `${environment.api}/faculty`,
  documentUrl: `${environment.api}/document`,
  getAllDocumentByTag: `${environment.api}/document/{tag}?tag=`,
  fileUpload: `${environment.api}/fileupload/single`,
  message: `${environment.api}/message`,
  createLink: `${environment.api}/docNotice`
};
