import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Student} from "../models/student";
import {Observable} from "rxjs";


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
}



