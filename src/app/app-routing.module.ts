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



const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
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
  {
    path: "students",
    component: StudentsComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
