import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeadComponent } from './components/head/head.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';


@NgModule({
  declarations: [AdminComponent, HeadComponent, UserEditorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
