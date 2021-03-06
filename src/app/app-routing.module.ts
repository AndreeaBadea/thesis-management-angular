import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegisterComponent} from "./components/register/register.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";
import {ProjectsListComponent} from "./components/projects-list/projects-list.component";
import {TeacherProfileComponent} from "./components/teacher-profile/teacher-profile.component";
import {UserDetailsFormComponent} from "./components/user-details-form/user-details-form.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {StudentProfileComponent} from "./components/student-profile/student-profile.component";
import {TeacherProfileStudentViewComponent} from "./teacher-profile-student-view/teacher-profile-student-view.component";

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
  {
    path:'projects-list',
    component: ProjectsListComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'teacher-profile',
    component: TeacherProfileComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'user-details-form',
    component: UserDetailsFormComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'students/:idUserAccount',
    component: UserDetailsFormComponent,

    // canActivate: [AuthGuardService]
  },
  {
    path:'admin',
    component: AdminDashboardComponent,
  },
  {
    path:'teacher-profile',
    component: TeacherProfileComponent,
  },
  {
    path:'student-profile',
    component: StudentProfileComponent,
  },
  {
    path:'teacher-profile-student-view',
    component: TeacherProfileStudentViewComponent,
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
