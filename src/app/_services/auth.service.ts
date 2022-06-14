import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

export class UserAccount{
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User{
    return this.userSubject.value;
  }

  authenticate(username: string, password: string){
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {username, password})
      .pipe(map(user => {
          localStorage.setItem("user", JSON.stringify(user));
          this.userSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }


  logOut() {
    localStorage.removeItem("user");
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/users/authenticate']);
  }


}
