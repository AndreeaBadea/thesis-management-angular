import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../_helpers/project.service";
import {TeacherService} from "../../_services/teacher.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {User} from "../../models/user";
import {Teacher} from "../../models/teacher";
import {TeacherSkill} from "../../models/teacher-skill";


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  projects!: Project[];
  selectedProjects!: Project[];
  cols!: any[];
  columns!: any[];
  closeResult!: string;
  editForm!: FormGroup;
  editProfileForm! : FormGroup
  idProjectToDelete!: number;
  retrivedUserObject!: User;
  currentTeacher!: Teacher;
  currentTeacherSkillsObject!: TeacherSkill
  teacherSkill!: TeacherSkill;
  currentTeacherId!: number;

  constructor(private projectService: ProjectService,
              private teacherService: TeacherService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder
             ) { }

  ngOnInit(): void {
    this.retrivedUserObject = JSON.parse(<string>localStorage.getItem('auth-user'));
    var idUserAccount = this.retrivedUserObject?.idUserAccount;

    this.teacherService.getTeacherByIdUserAccount(<number>idUserAccount).subscribe(data => {
      this.getAllProjects(data.idTeacher);
      this.currentTeacher = data;
      this.getTeacherSkills(data.idTeacher);

    });


    this.cols = [
      {field: 'idProject', header: 'ID'},
      {field: 'projectTitle', header:'Title'},
      {field: 'projectDescription', header:'Description'},
      {field: 'projectAvailability', header: 'Status'}
    ];

    this.editForm = this.formBuilder.group({
      idProject: [''],
      projectTitle: [''],
      projectDescription: [''],
      projectAvailability: ['']
    })

    this.editProfileForm = this.formBuilder.group({
      skillsName: [''],
      teachingSubjects: ['']
    })
  }

  onSubmit(f: NgForm){
    this.teacherService.addTeacherProject(this.currentTeacher.idTeacher,  f.value).subscribe((result) => {
      console.log(result.projectTitle);
      this.ngOnInit();
    });
    this.modalService.dismissAll();
    }

  onSave(){
    this.teacherService.updateTeacherProjects(this.currentTeacher.idTeacher, this.editForm.value.idProject, this.editForm.value)
      .subscribe((results) =>  {
        this.ngOnInit();
        this.modalService.dismissAll();
      })
    }

    onSaveExperience(){
    this.teacherService.updateTeacherSkill(this.currentTeacher.idTeacher, this.editProfileForm.value, this.currentTeacherSkillsObject.idTeachersSkills)
      .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
      })
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

  openEdit(targetModal: any, project: any) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      idProject: project.idProject,
      projectTitle: project.projectTitle,
      projectDescription: project.projectDescription,
      projectAvailability: project.projectAvailability
    });
  }

  openEditProfile(targetModal: any, teacherSkill: any){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editProfileForm.patchValue({

    })
  }

  openDelete(targetModal:any, project: any){
    this.idProjectToDelete = project.idProject;
    this.modalService.open(targetModal, {
      backdrop:'static',
      size: 'lg'
    })
  }

  onDelete(){
    this.teacherService.deleteTeacherProject(this.idProjectToDelete).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
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


}
