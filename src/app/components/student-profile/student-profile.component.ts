import { Component, OnInit } from '@angular/core';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  events!: any[];

  constructor() { }

  ngOnInit(): void {

  }

}
