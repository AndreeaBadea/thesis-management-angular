import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  // @ts-ignore
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  //   const user = this.authService.userValue;
  //   const isLoggedIn = user && user.token;
  //   const isApiUrl = request.url.startsWith(environment.apiUrl);
  //   if (isLoggedIn && isApiUrl) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${user.token}`
  //       }
  //     });
  //
  //   return next.handle(request);
  //   }
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler){

    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token') as any        }
      })
    }

    return next.handle(request);

  }


}
