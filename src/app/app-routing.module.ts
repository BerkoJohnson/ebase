import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/comps/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { UsersComponent } from "./components/users/users.component";
import { ElectionsComponent } from "./components/elections/elections.component";
import { StudentsComponent } from "./components/students/students.component";
import { PositionsComponent } from './components/elections/positions/positions.component';
import { CandidatesComponent } from './components/elections/candidates/candidates.component';
import { VotersComponent } from './components/elections/voters/voters.component';
import { ReportsComponent } from './components/elections/reports/reports.component';
import { SchoolComponent } from './components/school/school.component';
import { NewSchoolComponent } from './components/school/new-school/new-school.component';
import { CurrentSchoolInfoComponent } from './components/school/current-school-info/current-school-info.component';
import { SchoolDepartmentSetupComponent } from './components/school/department/department.component';
import { SchoolRoomSetupComponent } from './components/school/room/room.component';
import { CalenderComponent } from './components/school/calender/calender.component';
import { DashboardComponent } from './components/admins/dashboard/dashboard.component';
import { AdminsComponent } from './components/admins/admins.component';
import { NewStudentComponent } from './components/students/new-student/new-student.component';
import { ImportStudentsComponent } from './components/students/import-students/import-students.component';
import { StudentsHomeComponent } from './components/students/students-home/students-home.component';
import { VoteComponent } from './components/vote/vote.component';



const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admins', canActivate: [AuthGuard],component: AdminsComponent, children: [
      { path: "school", component: SchoolComponent, canActivate: [AuthGuard], children: [
        { path: 'new', component: NewSchoolComponent },
        { path: 'departments', component: SchoolDepartmentSetupComponent },
        { path: 'rooms', component: SchoolRoomSetupComponent },
        {path: 'calender', component: CalenderComponent},
        {path: "students", component: StudentsComponent, canActivate: [AuthGuard], children: [
          {path: '', component: StudentsHomeComponent},
          {path: 'new', component: NewStudentComponent},
          {path: 'add-multiple', component: ImportStudentsComponent},
        ] },
        { path: '', component: CurrentSchoolInfoComponent }
      ]
    },
      { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
      {
        path: "elections",
        component: ElectionsComponent,
        canActivate: [AuthGuard],
        children: [
          {path: 'positions', component: PositionsComponent},
          {path: 'candidates', component: CandidatesComponent},
          {path: 'voters', component: VotersComponent},
          {path: 'reports', component: ReportsComponent},
        ]
      },
      {path: '', component: DashboardComponent},
    ],
  },
  {path: 'vote', component: VoteComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
