import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../_services/project.service";
import {TeacherService} from "../../_services/teacher.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  projects!: Project[];
  project!: Project;
  selectedProjects!: Project[];
  cols!: any[];
  columns!: any[];
  closeResult!: string;
  currentTeacherId!: number;
  errorMessage!: any;
  editForm!: FormGroup;
  idProjectToDelete!: number;

  constructor(private projectService: ProjectService,
              private teacherService: TeacherService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder
             ) { }

  ngOnInit(): void {
    var retrivedUserObject = JSON.parse(<string>localStorage.getItem('auth-user'));
    var idUserAccount = retrivedUserObject.idUserAccount;

    this.teacherService.getTeacherByIdUserAccount(idUserAccount).subscribe(data => {
      this.getAllProjects(data.idTeacher);
      this.currentTeacherId = data.idTeacher;
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
  }

  onSubmit(f: NgForm){
    this.teacherService.addTeacherProject(this.currentTeacherId,  f.value).subscribe((result) => {
      console.log(result.projectTitle);
      this.ngOnInit();
    });
    this.modalService.dismissAll();
    }

    onSave(){
    this.teacherService.updateTeacherProjects(this.currentTeacherId, this.editForm.value.idProject, this.editForm.value)
      .subscribe((results) =>  {
        this.ngOnInit();
        this.modalService.dismissAll();
      })
    }


  getAllProjects(idTeacher:number){
    this.teacherService.getAllTeacherProjects(idTeacher).subscribe(data=> {
      console.log(data);
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


}
