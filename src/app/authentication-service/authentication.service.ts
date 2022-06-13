import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

export class UserAccount{
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: any){
    return this.httpClient
      .post<any>("http://localhost:8080/users/authenticate", {username, password})
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenString = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenString)
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }


}
