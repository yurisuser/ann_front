import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { CatalogTypesEditorComponent } from './components/catalog-types-editor/catalog-types-editor.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CatalogElementsEditorComponent } from './components/catalog-elements-editor/catalog-elements-editor.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'usereditor', component: UserEditorComponent},
      {path: 'tableeditor', component: TableEditorComponent,
        children: [
          {path: 'types', component: CatalogTypesEditorComponent},
          {path: 'elements', component: CatalogElementsEditorComponent},
          {path: '**', component: ErrorPageComponent},
        ]
      },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
