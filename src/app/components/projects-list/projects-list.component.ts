import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../_services/project.service";
import {User} from "../../models/user";
import {StudentService} from "../../_services/students.service";
import {Student} from "../../models/student";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects!: Project[];
  cols!: any[];
  selectedProject!: Project[];
  columns!: any[];
  dt: any;
  retrivedUserObject!: User;
  currentStudent!: Student;
  idCurrentUserAccount!: number | undefined

  constructor(private projectService : ProjectService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    // this.projects = this.projectService.getAllProjects();

    this.retrivedUserObject = JSON.parse(<string>localStorage.getItem('auth-user'));
     this.idCurrentUserAccount = this.retrivedUserObject?.idUserAccount;

    this.projectService.getAllProposedProjects().subscribe(data=> {
      this.projects = data;
    })

    this.cols = [
      {field: 'idProject', header: 'ID'},
      {field: 'projectTitle', header:'Project title'},
      {field: 'projectDescription', header:'Project description'},
      {field: 'teacherName', header: 'Teacher name'},
      {field: 'projectAvailability', header: 'Project availability'},
    ];
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

  // getProjects() {
  //   let projects = [];
  //   for(let project of this.projects) {
  //     //student.year = car.year.toString();
  //     projects.push(project);
  //   }
  //   return projects;
  // }



  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        // @ts-ignore
        const doc = new jsPDF.default(0, 0);
        // @ts-ignore
        doc.autoTable(this.columns, this.students);
        doc.save('primengTable.pdf');
      })
    })
  }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.getProjects());
  //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, "primengTable");
  //   });
  // }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }




}
