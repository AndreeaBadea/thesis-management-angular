import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler){

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token') as any        }
      })
    }

    return next.handle(request);

  }
}
