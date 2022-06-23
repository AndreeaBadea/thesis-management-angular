import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentComponent} from "./student/student.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {StudentsListComponent} from "./students-list/students-list.component";

const routes: Routes = [
  {
    path: 'users/authenticate',
    component: LoginComponent
  },
  {
    path: 'users/register',
    component: RegisterComponent
  },
  {
    path: 'students',
    component: StudentComponent,
    // canActivate: [AuthGuardService],
    // data: {roles: [Role.User]}
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path:'home',
    component: HomeComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'students-list',
    component: StudentsListComponent,
    // canActivate: [AuthGuardService]
  },
  { path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
