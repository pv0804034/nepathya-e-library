import { NbButtonModule, NbCardModule, NbSpinnerModule, NbCheckboxModule, NbAlertComponent, NbAlertModule, NbInputModule, NbLayoutModule, NbFormFieldModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterSidenavComponent } from './login-register-sidenav/login-register-sidenav.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const COMPONENTS = [
  LoginComponent,
  LoginRegisterSidenavComponent,
  RegisterComponent,
  ChangePasswordComponent
]

const MODULES = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
]

const NB_MODULES = [
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbSelectModule,
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, ...NB_MODULES]
})
export class AuthModule { }
