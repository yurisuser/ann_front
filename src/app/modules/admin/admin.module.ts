import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeadComponent } from './components/head/head.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { ModalNewUserComponent } from './modal/modal-new-user/modal-new-user.component';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    AdminComponent,
    HeadComponent,
    UserEditorComponent,
    ModalNewUserComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  entryComponents: [
    ModalNewUserComponent,
    ConfirmComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    DialogService,
  ]
})
export class AdminModule { }
