import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./models/user";
import {Role} from "./models/role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isStudent(){
    return this.user && this.isUser();
  }

  isUser(){
    return Object.values<string>(Role).includes('USER');
  }


}
