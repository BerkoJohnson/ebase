import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NewUserFormComponent } from './components/comps/new-user-form/new-user-form.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UsersListComponent } from './components/comps/users-list/users-list.component';
import {Announcer} from './services/announcer';
import { LoginComponent } from './components/comps/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewUserFormComponent,
    UsersListComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthService,
    UserService,
    Announcer,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
