import {Component, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {ProjectService} from "../_services/project.service";

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

  constructor(private projectService : ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();

    this.cols = [
      {field: 'idProject', header: 'ID'},
      {field: 'projectTitle', header:'Project title'},
      {field: 'projectDescription', header:'Project description'},
      {field: 'teacherName', header: 'Teacher name'},
      {field: 'projectAvailability', header: 'Project availability'}
    ];
  }


  getProjects() {
    let projects = [];
    for(let project of this.projects) {
      //student.year = car.year.toString();
      projects.push(project);
    }
    return projects;
  }



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

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getProjects());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

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
