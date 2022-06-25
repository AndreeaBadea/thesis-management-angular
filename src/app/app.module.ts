import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StudentComponent} from './student/student.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    StudentsListComponent,
    ProjectsListComponent,
    TeacherProfileComponent
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
        MatCardModule
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
