import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../models/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StudentProjects} from "../models/student-projects";
import {ProjectRequest} from "../models/project-request";


const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) { }

  public getAllProposedProjects() : Observable<Project[]> {
    return this.http.get<Project[]>(API_URL + `projects`, httpOptions);
  }

  public getAllAllocatedProjects() : Observable<StudentProjects[]>{
    return this.http.get<StudentProjects[]>(API_URL + `projects/allocated`, httpOptions);
  }

  public makeProjectRequest(idStudent: number, project: Project):Observable<ProjectRequest>{
    const body = JSON.stringify(project);
    return this.http.post<ProjectRequest>(API_URL + `students/${idStudent}/projects/request`, body, httpOptions);
  }
}
