import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Student} from "../models/student";


const API_URL = 'http://localhost:8080/';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {
  }

  getById(id: number) {
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
  }
}



