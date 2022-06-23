import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../models/student";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private AUTH_API = "http://localhost:8080"

  constructor(private http : HttpClient) { }

  public getAllStudents() : Observable<Student[]>{
    return this.http.get<Student[]>(this.AUTH_API + '/students');
  }

}
