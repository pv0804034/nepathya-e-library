import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule, 
  NbSidebarModule, 
  NbMenuModule,
  NbInputModule,
  NbTooltipModule,
  NbFormFieldModule,
  NbIconModule,
  NbTreeGridModule,
  NbLayoutModule,
  NbCardModule,
} from '@nebular/theme';
import { CustomerCkeditorComponent } from './customer-ckeditor/customer-ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonCustomTableComponent } from './common-custom-table/common-custom-table.component';

const COMPONENTS = [
  CustomerCkeditorComponent,
  CommonCustomTableComponent
]

const MODULES = [
  CommonModule,
  CKEditorModule,
  ReactiveFormsModule,
  FormsModule,
]

const NB_MODULES = [
  NbActionsModule,
  NbSidebarModule,
  NbMenuModule,
  NbInputModule,
  NbTooltipModule,
  NbFormFieldModule,
  NbIconModule,
  NbTreeGridModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
]

@NgModule({
  imports: [...MODULES, ...NB_MODULES],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})

export class SharedModule { 
  
}
