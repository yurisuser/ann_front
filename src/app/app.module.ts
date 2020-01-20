import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { GaleryComponent } from './components/galery/galery.component';
import { SeasonComponent } from './components/season/season.component';
import { IdeaComponent } from './components/idea/idea.component';
import { CallbackComponent } from './components/callback/callback.component';
import { PolygraphyComponent } from './components/polygraphy/polygraphy.component';
import { LargePrintComponent } from './components/large-print/large-print.component';
import { SuvenirkaComponent } from './components/suvenirka/suvenirka.component';
import { NaruzhkaComponent } from './components/naruzhka/naruzhka.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LeftMenuComponent,
    CatalogComponent,
    GaleryComponent,
    SeasonComponent,
    IdeaComponent,
    CallbackComponent,
    PolygraphyComponent,
    LargePrintComponent,
    SuvenirkaComponent,
    NaruzhkaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
