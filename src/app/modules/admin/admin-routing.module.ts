import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'usereditor', component: UserEditorComponent}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
