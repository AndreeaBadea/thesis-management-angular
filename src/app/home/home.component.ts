import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User;
  userFromApi: User | undefined;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getById(this.user.idUser).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });

  }
}
