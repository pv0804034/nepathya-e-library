import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbIconModule, NbCardModule, NbButtonModule, NbTreeGridModule, NbInputModule, NbCheckboxModule, NbSelectModule, NbLayoutModule, NbDialogModule, NbWindowModule, NbDatepickerModule, NbTooltipModule, NbToggleModule, NbBadgeModule } from '@nebular/theme';
import { PagesRoutingModule } from '../../pages-routing.module';
import { RolesComponent } from './roles/roles.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';
import { EditRolesComponent } from './roles/edit-roles/edit-roles.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';



const COMPONENTS = [
  RolesComponent, 
  AddRolesComponent, 
  EditRolesComponent
]

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  PagesRoutingModule,
]

const NB_MODULES = [
  NbIconModule,
  NbCardModule,
  NbButtonModule,
  NbTreeGridModule,
  NbInputModule,
  NbCheckboxModule,
  NbSelectModule,
  NbLayoutModule,
  NbIconModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbDatepickerModule,
  NbTooltipModule,
  NbToggleModule,
  NbBadgeModule 


]

@NgModule({
  imports: [...MODULES, ...NB_MODULES],
  declarations: [...COMPONENTS, UsersComponent, AddUsersComponent, EditUsersComponent],
})
export class DataSettingsModule { }
