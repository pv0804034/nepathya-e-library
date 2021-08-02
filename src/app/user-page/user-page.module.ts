import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { TagComponent } from './tag/tag.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSharedPageModule } from '../user-shared-page/user-shared-page.module';
import { NbContextMenuModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbUserModule, NbCheckboxModule, NbActionsModule, NbButtonModule, NbThemeModule, NbWindowModule, NbInputModule, NbToastrModule, NbDialogModule, NbTooltipModule, NbCardModule } from '@nebular/theme';
import { FilterByTagComponent } from './tag/filter-by-tag/filter-by-tag.component';
import { PreviewDocumentComponent } from './home/preview-document/preview-document.component';
import { LinkComponent } from './link/link.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AboutComponent,
    AddDocumentComponent,
    HomeComponent,
    SupportComponent,
    TagComponent,
    FilterByTagComponent,
    PreviewDocumentComponent,
    LinkComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UserSharedPageModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class UserPageModule { }