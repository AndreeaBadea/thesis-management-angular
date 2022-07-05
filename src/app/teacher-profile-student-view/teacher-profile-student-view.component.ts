import {Component, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {FormBuilder, NgForm} from "@angular/forms";
import {User} from "../models/user";
import {Teacher} from "../models/teacher";
import {TeacherSkill} from "../models/teacher-skill";
import {ProjectService} from "../_services/project.service";
import {TeacherService} from "../_services/teacher.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentService} from "../_services/students.service";
import {Student} from "../models/student";
import {CoordinatedStudent} from "../_helpers/coordinated-student";
import {CoordinatedStudentService} from "../_helpers/coordinated.student.service";
import {Meeting} from "../models/meeting";
import {MeetingsService} from "../_helpers/meetings.service";

@Component({
  selector: 'app-teacher-profile-student-view',
  templateUrl: './teacher-profile-student-view.component.html',
  styleUrls: ['./teacher-profile-student-view.component.css']
})
export class TeacherProfileStudentViewComponent implements OnInit {

  projects!: Project[];
  cols!: any[];
  columns!: any[];
  closeResult!: string;
  retrivedUserObject!: User;
  currentTeacher!: Teacher;
  currentTeacherSkillsObject!: TeacherSkill;
  teacherSkill!: TeacherSkill;
  currentTeacherId!: number;
  coordinatedStudents!:  CoordinatedStudent[];
  coordinatedStudentsCols!: any[];
  meetingsCols!: any[];
  currentStudent!: Student;
  idCurrentUserAccount!: number;
  meetings!: Meeting[];

  constructor(private projectService: ProjectService,
              private teacherService: TeacherService,
              private studentService: StudentService,
              private coordinatedStudentsService: CoordinatedStudentService,
              private modalService: NgbModal,
              private meetingService: MeetingsService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.retrivedUserObject = JSON.parse(<string>localStorage.getItem('auth-user'));
    var idUserAccount = this.retrivedUserObject?.idUserAccount;

    this.teacherService.getTeacherByIdUserAccount(<number>idUserAccount).subscribe(data => {
      this.getAllProjects(data.idTeacher);
      this.currentTeacher = data;
      this.getTeacherSkills(data.idTeacher);
      this.coordinatedStudents = this.coordinatedStudentsService.getAllCoordinatedStudents();
      this.meetings = this.meetingService.getAllMeetings();

    });


    this.cols = [
      {field: 'idProject', header: 'ID'},
      {field: 'projectTitle', header:'Title'},
      {field: 'projectDescription', header:'Description'},
      {field: 'projectAvailability', header: 'Status'}
    ];


    this.coordinatedStudentsCols = [
      {field:'idCoordinatedStudent', header: 'ID'},
      {field: 'studentName', header: 'Student Name'},
      {field: 'classRoom', header:  'Classroom'},
      {field: 'projectTitle', header: 'Allocated Project'}
    ]

    this.meetingsCols = [
      {field: 'idMeeting', header: 'ID'},
      {field: 'date', header: 'Date'},
      {field: 'hour', header: 'Hour'},
      {field: 'participantName', header: 'Participant'},
      {field: 'meetingSubject', header: 'Meeting Subject'}
    ]

  }

  onSubmit(f: NgForm){
    this.teacherService.addTeacherProject(this.currentTeacher.idTeacher,  f.value).subscribe((result) => {
      console.log(result.projectTitle);
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }


  OnSendProposal(f: NgForm){
    console.log("Proposal text:" + f.value);
  }


  getAllProjects(idTeacher:number){
    this.teacherService.getAllTeacherProjects(idTeacher).subscribe(data=> {
      this.projects = data;
    })
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  getTeacherSkills(idTeacher: number){
    this.teacherService.getTeacherSkillByIdTeacher(idTeacher).subscribe(data => {
      this.currentTeacherSkillsObject = data;
    })
  }




  isProjectAvailable(project: Project): boolean{
    return project.projectAvailability == "AVAILABLE";
  }


  onClick(project: any){
    if(this.retrivedUserObject.roles?.length === 1){
      this.studentService.getStudentByIdUserAccount(<number>this.idCurrentUserAccount).subscribe((data) =>{
        this.currentStudent = data;
      })
    }
    console.log("project" + project.idProject);
    this.projectService.makeProjectRequest(this.currentStudent.idStudent, project).subscribe((data) =>{
        console.log("Project id " + project.idProject + " requested!");
      }
    )
  }



}
