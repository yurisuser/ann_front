import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { GaleryComponent } from './components/galery/galery.component';
import { SeasonComponent } from './components/season/season.component';
import { IdeaComponent } from './components/idea/idea.component';
import { CallbackComponent } from './components/callback/callback.component';
import { PolygraphyComponent } from './components/polygraphy/polygraphy.component';
import { LargePrintComponent } from './components/large-print/large-print.component';
import { SuvenirkaComponent } from './components/suvenirka/suvenirka.component';
import { NaruzhkaComponent } from './components/naruzhka/naruzhka.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'main', component: MainComponent,
    children: [
      { path: '', component: CatalogComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'catalog/polygraphy', component: PolygraphyComponent },
      { path: 'catalog/largeprint', component: LargePrintComponent },
      { path: 'catalog/suvenirka', component: SuvenirkaComponent },
      { path: 'catalog/naruzhka', component: NaruzhkaComponent },
      { path: 'galery', component: GaleryComponent },
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
