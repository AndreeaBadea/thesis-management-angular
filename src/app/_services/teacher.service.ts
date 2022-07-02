import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Project} from "../models/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Teacher} from "../models/teacher";


const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})

export class TeacherService {


  constructor(private http : HttpClient) { }

  public getAllTeacherProjects(idTeacher: number): Observable<Project[]> {
    return this.http.get<Project[]>(API_URL + `teachers/${idTeacher}/projects`, httpOptions);
  }

  public getTeacherByIdUserAccount(idUserAccount: number):Observable<Teacher>{
    return this.http.get<Teacher>(API_URL + `teachers/${idUserAccount}`, httpOptions);

  }

  public addTeacherProject(idTeacher:number, project: Project): Observable<Project>{
    const body = JSON.stringify(project);
    return this.http.post<Project>(API_URL + `teachers/${idTeacher}/project`, body, httpOptions);
  }

  public updateTeacherProjects(idTeacher:number, idProject:number, project: Project): Observable<Project>{
    const body = JSON.stringify(project);
    return this.http.put<Project>(API_URL + `teachers/${idTeacher}/projects/${idProject}`, body, httpOptions);
  }

  public deleteTeacherProject(idProject: number): Observable<any>{
    return this.http.delete(API_URL + `teachers/projects/${idProject}`, httpOptions);
  }



}
