import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'usereditor', component: UserEditorComponent},
      {path: 'tableeditor', component: TableEditorComponent},
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
