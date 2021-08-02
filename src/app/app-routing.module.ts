import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './user-page/about/about.component';
import { AddDocumentComponent } from './user-page/add-document/add-document.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './user-page/home/home.component';
import { SupportComponent } from './user-page/support/support.component';
import { TagComponent } from './user-page/tag/tag.component';
import { FilterByTagComponent } from './user-page/tag/filter-by-tag/filter-by-tag.component';
import { PreviewDocumentComponent } from './user-page/home/preview-document/preview-document.component';
import { LinkComponent } from './user-page/link/link.component';
import { ProfileComponent } from './user-page/profile/profile.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'tag', component: TagComponent},
  { path: 'home/tag/:tag', component: FilterByTagComponent },
  { path: 'home/document/:document', component: PreviewDocumentComponent},
  {path: 'link/add-document', component: AddDocumentComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'support', component: SupportComponent},
  {path: 'link', component: LinkComponent},
  {path: 'about', component: AboutComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotPassword',
    component: ChangePasswordComponent
  },
  {
    path: 'pages',
    canActivate:[AuthGuardService],

    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },

// { path: '*', redirectTo: '/main-dashboard/ckeditor', pathMatch: 'full' },
// { path: '**', redirectTo: '/main-dashboard/ckeditor' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
