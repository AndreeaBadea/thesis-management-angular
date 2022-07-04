import { Component, OnInit } from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {Teacher} from "../../models/teacher";
import {TeacherSkill} from "../../models/teacher-skill";
import {TeacherService} from "../../_services/teacher.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentService} from "../../_services/students.service";
import {StudentSkill} from "../../models/student-skill";
import {Student} from "../../models/student";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  editProfileForm! : FormGroup
  retrivedUserObject!: User;
  currentStudent!: Student;
  currentStudentSkillsObject!: StudentSkill;


  constructor(private studentService: StudentService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.retrivedUserObject = JSON.parse(<string>localStorage.getItem('auth-user'));
    var idUserAccount = this.retrivedUserObject?.idUserAccount;

    this.studentService.getStudentByIdUserAccount(<number>idUserAccount).subscribe(data=> {
      this.getStudentSkills(data.idStudent);
      console.log(data.idStudent);
      this.currentStudent = data;
    })

    this.editProfileForm = this.formBuilder.group({
      skillsName: [''],
      favouriteSubjects: ['']
    })

  }

  getStudentSkills(idStudent: number){
    this.studentService.getStudentSkillByIdStudent(idStudent).subscribe(data => {
      console.log("Aaaaaaaaaaaaaa")
      this.currentStudentSkillsObject = data;
      console.log("skills name" + data.skillsName);
      console.log("subjects " + data.idStudent + data.idStudentSkill + data.skillsName + data.favouriteSubjects);
    })
  }

  openEditProfile(targetModal: any, studentSkill: any){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editProfileForm.patchValue({
          skillsName: this.currentStudentSkillsObject.skillsName,
          favouriteSubjects: this.currentStudentSkillsObject.favouriteSubjects
    })
  }


  onSaveExperience(){
    this.studentService.updateStudentSkill(this.currentStudent.idStudent, this.editProfileForm.value, this.currentStudentSkillsObject.idStudentSkill)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      })
  }



}
