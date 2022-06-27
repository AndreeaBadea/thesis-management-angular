import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../_services/auth.service";
import {UserService} from "../../_services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;

  constructor(private userService: UserService,) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
