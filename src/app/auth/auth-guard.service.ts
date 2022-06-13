import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Role } from '../models/role';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (user) {
      // if(route.data.roles && route.data.roles.indexof(user.roles) === -1){
      if (route.data.roles && route.data.roles.some((role: Role) => user.roles?.indexOf(role) == -1)){
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }

      this.router.navigate(['/users/authenticate'], {queryParams: {returnUrl: state.url}});
      return false;
  }

}
