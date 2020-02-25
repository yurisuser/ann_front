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
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { DialogService } from './services/dialog.service';
import { ModalNewUserComponent } from './modal/modal-new-user/modal-new-user.component';
import { ModalEditUserComponent } from './modal/modal-edit-user/modal-edit-user.component';
import { ModalPSWChangeForceComponent } from './modal/modal-psw-change-force/modal-pswchange-force/modal-pswchange-force.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeadComponent,
    UserEditorComponent,
    ConfirmComponent,
    ModalNewUserComponent,
    ModalEditUserComponent,
    ModalPSWChangeForceComponent,
    TableEditorComponent,
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
    ModalEditUserComponent,
    ModalPSWChangeForceComponent,
    ConfirmComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    DialogService,
  ]
})
export class AdminModule { }
