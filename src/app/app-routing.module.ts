import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { GaleryComponent } from './components/galery/galery.component';
import { SeasonComponent } from './components/season/season.component';
import { IdeaComponent } from './components/idea/idea.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HelloPageComponent } from './components/hello-page/hello-page.component';
import { CatalogElementPageComponent } from './components/catalog-element-page/catalog-element-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'main', component: MainComponent,
    children: [
      { path: '', component: HelloPageComponent },
      { path: 'catalog', component: CatalogComponent},
      { path: 'catalog/:type', component: CatalogComponent},
      { path: 'catalog/elementpage/:page', component: CatalogElementPageComponent },
      { path: 'galery', component: GaleryComponent },
      { path: 'galery/:type', component: GaleryComponent },
      { path: 'season', component: SeasonComponent },
      { path: 'idea', component: IdeaComponent },
      { path: 'callback', component: CallbackComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
