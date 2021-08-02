import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbToggleModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';
import { PagesRoutingModule } from './pages-routing.module';
import { OneColumnLayoutComponent } from '../layouts/one-column/one-column.layout';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DialogSampleComponent } from './dialog-sample/dialog-sample.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSettingsModule } from './data-settings/data-settings/data-settings.module';
import { TableFilterPipe } from '../pipes/table-filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DocumentComponent } from './document/document.component';
import { FacultyComponent } from './faculty/faculty.component';
import { TagComponent } from './tag/tag.component';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import { EditTagComponent } from './tag/edit-tag/edit-tag.component';
import { AddFacultyComponent } from './faculty/add-faculty/add-faculty.component';
import { EditFacultyComponent } from './faculty/edit-faculty/edit-faculty.component';
import { AddDocumentComponent } from './document/add-document/add-document.component';
import { EditDocumentComponent } from './document/edit-document/edit-document.component';
import { PreviewDocumentComponent } from './document/preview-document/preview-document.component';
import { MessageComponent } from './message/message.component';
import { UsersComponent } from './data-settings/data-settings/users/users.component';
import { RolesComponent } from './data-settings/data-settings/roles/roles.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { AddCreateLinkComponent } from './create-link/add-create-link/add-create-link.component';
import { EditCreateLinkComponent } from './create-link/edit-create-link/edit-create-link.component';
import { PreviewMessageComponent } from './message/preview-message/preview-message.component';

const COMPONENTS = [
  MainDashboardComponent,
  OneColumnLayoutComponent,
  DialogSampleComponent,
  HeaderComponent,
  TableFilterPipe,
  DashboardComponent,
  DocumentComponent, 
  FacultyComponent, 
  TagComponent, 
  AddTagComponent, 
  EditTagComponent,
  CreateLinkComponent
];

const MODULES = [
  CommonModule,
  RouterModule,
  PagesRoutingModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  DataSettingsModule,
  NgxPaginationModule,
];

const NB_MODULES = [
  NbMenuModule,
  NbSidebarModule,
  NbIconModule,
  NbLayoutModule,
  NbIconModule,
  NbToggleModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbUserModule,
  NbActionsModule,
  NbContextMenuModule,
  NbSelectModule,
  NbDatepickerModule,
];

@NgModule({
  imports: [...MODULES, ...NB_MODULES],
  declarations: [...COMPONENTS, AddFacultyComponent, EditFacultyComponent, AddDocumentComponent, EditDocumentComponent, PreviewDocumentComponent, MessageComponent, CreateLinkComponent, AddCreateLinkComponent, EditCreateLinkComponent, PreviewMessageComponent],
})
export class PagesModule { }
