import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { CatalogTypesEditorComponent } from './components/catalog-types-editor/catalog-types-editor.component';
import { CatalogElementsEditorComponent } from './components/catalog-elements-editor/catalog-elements-editor.component';
import { ImagerComponent } from './components/imager/imager.component';
import { GaleryTypesEditorComponent } from './components/galery-types-editor/galery-types-editor.component';
import { GaleryElementsEditorComponent } from './components/galery-elements-editor/galery-elements-editor.component';
import { CatalogPageEditorComponent } from './components/catalog-page-editor/catalog-page-editor.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'usereditor', component: UserEditorComponent},
      {path: 'imager', component: ImagerComponent},
      {path: 'tableeditor', component: TableEditorComponent,
        children: [
          {path: 'catalogtypes', component: CatalogTypesEditorComponent},
          {path: 'catalogelements', component: CatalogElementsEditorComponent},
          {path: 'catalogelementspages', component: CatalogPageEditorComponent},
          {path: 'galerytypes', component: GaleryTypesEditorComponent},
          {path: 'galeryelements', component: GaleryElementsEditorComponent},
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
