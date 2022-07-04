import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Student} from "../models/student";
import {Observable} from "rxjs";
import {Teacher} from "../models/teacher";
import {TeacherSkill} from "../models/teacher-skill";
import {StudentSkill} from "../models/student-skill";


const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getById(id: number) {
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
  }

  public getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(API_URL + `students`, httpOptions);
  }

  public getStudentByIdUserAccount(idUserAccount: number){
    return this.http.get<Student>(API_URL + `students/${idUserAccount}`, httpOptions);
  }

  public getStudentSkillByIdStudent(idStudent: number): Observable<StudentSkill>{
    return this.http.get<StudentSkill>(API_URL + `students/${idStudent}/skills`, httpOptions);
  }

  public updateStudentSkill(idStudent: number, studentSkill: StudentSkill, idStudentSkill: number): Observable<StudentSkill>{
    const body = JSON.stringify(studentSkill);
    return this.http.put<StudentSkill>(API_URL + `students/${idStudent}/skills/${idStudentSkill}`,body, httpOptions);
  }
}



