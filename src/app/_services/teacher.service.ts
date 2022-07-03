import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Project} from "../models/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Teacher} from "../models/teacher";
import {TeacherSkill} from "../models/teacher-skill";


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

  public getTeacherSkillByIdTeacher(idTeacher: number): Observable<TeacherSkill>{
    return this.http.get<TeacherSkill>(API_URL + `teachers/${idTeacher}/skills`, httpOptions);
  }

  public updateTeacherSkill(idTeacher: number, teacherSkill: TeacherSkill, idTeacherSkill: number): Observable<TeacherSkill>{
    const body = JSON.stringify(teacherSkill);
    return this.http.put<TeacherSkill>(API_URL + `teachers/${idTeacher}/skills/${idTeacherSkill}`,body, httpOptions);
  }

  public addTeacher(idUserAccount: number, teacher: Teacher): Observable<Teacher>{
    const body = JSON.stringify(teacher);
    return this.http.post<Teacher>(API_URL + `admin/${idUserAccount}/teachers`, body, httpOptions);
  }

  public getAllTeachers():Observable<Teacher[]>{
    return this.http.get<Teacher[]>(API_URL + `teachers`, httpOptions);
  }



}
