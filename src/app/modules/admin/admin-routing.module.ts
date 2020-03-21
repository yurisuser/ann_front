import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { CatalogTypesEditorComponent } from './components/catalog-types-editor/catalog-types-editor.component';
import { CatalogElementsEditorComponent } from './components/catalog-elements-editor/catalog-elements-editor.component';
import { ImagerComponent } from './components/imager/imager.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'usereditor', component: UserEditorComponent},
      {path: 'imager', component: ImagerComponent},
      {path: 'tableeditor', component: TableEditorComponent,
        children: [
          {path: 'types', component: CatalogTypesEditorComponent},
          {path: 'elements', component: CatalogElementsEditorComponent},
          {path: '**', component: CatalogElementsEditorComponent},
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
