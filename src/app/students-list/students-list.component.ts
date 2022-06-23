import { Component, OnInit } from '@angular/core';
import {StudentService} from "../_services/student.service";
import {Student} from "../models/student";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  private getAllStudents(){
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    })
  }

}
