import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Student} from "../models/student";

const API_URL = 'https://localhost:8080/';




@Injectable({ providedIn: 'root' })
export class UserDetailsService {

  constructor(private router: Router, private http: HttpClient) {
  }


  saveStudent(idUserAccount: number, student: Student): Observable<any> {
    const body = JSON.stringify(student);
    const headers = {'Content-Type': 'application/json'}
   // const params = new HttpParams().set('id', idUserAccount);
    return this.http.post(API_URL + 'students/' + idUserAccount, body);

  }
}
