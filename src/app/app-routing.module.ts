import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentComponent} from "./student/student.component";
import {AuthGuardService} from "./_services/auth-guard.service";
import {HomeComponent} from "./home/home.component";
import {Role} from "./models/role";

const routes: Routes = [
  {
    path: 'users/authenticate',
    component: LoginComponent
  },
  {
    path: 'students',
    component: StudentComponent,
    canActivate: [AuthGuardService],
    data: {roles: [Role.User]}
  },
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
