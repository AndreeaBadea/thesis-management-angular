import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient){}

  authenticate(username: string, password: string): Observable<any>{
    console.log(username);
    console.log(password);
    return this.http
      .post<any>(AUTH_API + '/users/authenticate', {
        username,
        password
      }, httpOptions);
    console.log(username);
    console.log(password);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/users/register', {
      username,
      email,
      password
    }, httpOptions);
  }

}
