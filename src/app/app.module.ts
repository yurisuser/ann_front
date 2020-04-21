import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { TokenInterceptor } from './interceptors/token-interceptor';
import { AuthService } from './services/auth.service';
import { HeaderInterceptor } from './interceptors/header-interceptor';
import { HelloPageComponent } from './components/hello-page/hello-page.component';

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
    HelloPageComponent,
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
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
