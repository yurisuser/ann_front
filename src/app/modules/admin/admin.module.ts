import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
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
import { CatalogTypesEditorComponent } from './components/catalog-types-editor/catalog-types-editor.component';
import { ModalEditCatalogTypeComponent } from './modal/modal-edit-catalog-type/modal-edit-catalog-type.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

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
    CatalogTypesEditorComponent,
    ModalEditCatalogTypeComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  entryComponents: [
    ModalNewUserComponent,
    ModalEditUserComponent,
    ModalPSWChangeForceComponent,
    ModalEditCatalogTypeComponent,
    ConfirmComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    DialogService,
  ]
})
export class AdminModule { }
