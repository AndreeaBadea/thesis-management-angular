import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import { UserDetailsFormComponent } from './components/user-details-form/user-details-form.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {TimelineModule} from "primeng/timeline";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    StudentsListComponent,
    ProjectsListComponent,
    TeacherProfileComponent,
    UserDetailsFormComponent,
    StudentProfileComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    MatGridListModule,
    MatCardModule,
    TimelineModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
