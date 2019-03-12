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
import { CandidateService } from './services/candidate.service';
import { PositionService } from './services/position.service';
import { UsersListComponent } from './components/comps/users-list/users-list.component';
import {Announcer} from './services/announcer';
import { LoginComponent } from './components/comps/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { StudentsComponent } from './components/students/students.component';
import { NewStudentComponent } from './components/students/new-student/new-student.component';
import { ElectionsComponent } from './components/elections/elections.component';
import { PositionsComponent } from './components/elections/positions/positions.component';
import { CandidatesComponent } from './components/elections/candidates/candidates.component';
import { VotersComponent } from './components/elections/voters/voters.component';
import { ReportsComponent } from './components/elections/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewUserFormComponent,
    UsersListComponent,
    LoginComponent,
    UsersComponent,
    StudentsComponent,
    NewStudentComponent,
    ElectionsComponent,
    PositionsComponent,
    CandidatesComponent,
    VotersComponent,
    ReportsComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthService,
    UserService,
    Announcer,
    AuthGuard,
    PositionService,
    CandidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
