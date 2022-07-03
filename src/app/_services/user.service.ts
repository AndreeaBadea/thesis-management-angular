import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/users/all', { responseType: 'text' });
  }

  public addUserAccount(user: User): Observable<User>{
    const body = JSON.stringify(user);
    return this.http.post<User>(API_URL + `admin/register`, body, httpOptions);
  }

  public getAllUsersAccounts(): Observable<User[]>{
    return this.http.get<User[]>(API_URL + `admin/users`, httpOptions);
  }


}
