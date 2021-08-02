import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DialogSampleComponent } from './dialog-sample/dialog-sample.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { RolesComponent } from './data-settings/data-settings/roles/roles.component';
import { UsersComponent } from './data-settings/data-settings/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { FacultyComponent } from './faculty/faculty.component';
import { TagComponent } from './tag/tag.component';
import { MessageComponent } from './message/message.component';
import { LoginService } from '../service/auth/login.service';
import { CreateLinkComponent } from './create-link/create-link.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      // {
      //   path: 'dialog',
      //   component: DialogSampleComponent,
      // },
      // {
      //   path: 'roles',
      //   component: RolesComponent,
      // },
      // {
      //   path: 'users',
      //   component: UsersComponent,
      // },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'document',
        component: DocumentComponent
      },
      {
        path: 'faculty',
        component: FacultyComponent
      },
      {
        path: 'tag',
        component: TagComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },{
        path: 'createLink',
        component: CreateLinkComponent
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { 

  constructor(private loginService: LoginService,private router: Router ){
    if(loginService.getCurrentUser() == null){
      router.navigate(['/home']);
    }else if(loginService.getCurrentUser()?.roleName !== 'executiveSuperAdmin'){
      router.navigate(['/home']);
    }
  }
}
