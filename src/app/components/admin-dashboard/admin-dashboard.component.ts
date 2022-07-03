import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../_services/user.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {TeacherService} from "../../_services/teacher.service";
import {Project} from "../../models/project";
import {StudentService} from "../../_services/students.service";
import {ProjectService} from "../../_services/project.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users!: User[];
  user!:User;
  selectedUsers!: Project[];
  closeResult!: string;
  cols!: any[];
  columns!: any[];
  retrivedUserObject!: User;
  numberOfStudents!: number;
  numberOfTeachers!: number;
  numberOfProposedThesis!: number;
  numberOfAllocatedThesis!: number;

  constructor(private userService: UserService,
              private teacherService: TeacherService,
              private studentService: StudentService,
              private projectService: ProjectService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

    this.studentService.getAllStudents().subscribe(data=> {
      this.numberOfStudents = data.length;
    })

    this.teacherService.getAllTeachers().subscribe(data=> {
      this.numberOfTeachers = data.length;
    })

    this.projectService.getAllProposedProjects().subscribe(data=> {
      this.numberOfProposedThesis = data.length;
    })

    this.projectService.getAllAllocatedProjects().subscribe(data => {
      this.numberOfAllocatedThesis = data.length;
    })

    this.userService.getAllUsersAccounts().subscribe(data => {
      this.users = data;
    })



    this.cols = [
      {field: 'idUserAccount', header: 'ID'},
      {field: 'username', header:'Username'},
      {field: 'email', header:'Email'},
      {field:  'roles', header: 'Roles'}
    ];
  }


  onSubmitUser(f: NgForm){
    console.log(f.value);
    this.userService.addUserAccount(f.value).subscribe((result) =>{
      console.log("addUserAccount result data: " + result.username);
      this.ngOnInit();
    });
    this.modalService.dismissAll()
  }

  onSubmitTeacher(f: NgForm){
    console.log("submit teacher" + f.value);
    this.teacherService.addTeacher(f.value.idUserAccount, f.value).subscribe((result) =>{
      console.log("addUserAccount result data: " + result.firstName);
      this.ngOnInit();
    });
    this.modalService.dismissAll()
  }



  openAddUser(addUserContent: any){
    this.modalService.open(addUserContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddTeacher(addTeacherContent: any){
    this.modalService.open(addTeacherContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  giveTeacherRoleToUser(user: any){
    this.userService.giveTeacherRoleToUser(user.idUserAccount).subscribe((data) => {
      console.log("UserAccount roles: " + data.roles);
      this.ngOnInit();
    })
  }

  giveAdminRoleToUser(user: any){
    this.userService.giveAdminRoleToUser(user.idUserAccount).subscribe((data) => {
      console.log("UserAccount roles: " + data.roles);
      this.ngOnInit();
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
