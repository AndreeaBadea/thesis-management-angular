import { Component, OnInit } from '@angular/core';
import {StudentsListService} from "../../_services/students-list.service";
import {SortEvent} from "primeng/api";
import {Table} from "primeng/table";
import {StudentList} from "../../models/student-list";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  students!: StudentList[];
  cols! : any[];
  first: number = 0;
  selectedStudents!: StudentList[];
  columns!: any[];
  dt: any;
  dtSearch: any;


  constructor(private studentService: StudentsListService) {

  }

  // ngOnInit(): void {
  //   this.studentService.getAllStudents().subscribe(data => {
  //     console.log(data);
  //     this.students = data;
  //
  //     this.cols = [
  //       {field: 'idStudent', header: 'ID'},
  //       {field: 'firstName', header: 'First Name'},
  //       {field: 'lastName', header: 'Last Name'},
  //       {field: 'user.email', header: 'Email'},
  //       {field: '', header: 'Faculty domain'},
  //       {field: '', header: 'Class'},
  //       {field: '', header: 'Coordinating teacher'},
  //       {field: '', header: 'Thesis status'}
  //
  //     ];
  //
  //   })
  // }
  dt2: any;

  ngOnInit(): void {
    this.students = this.studentService.getAllStudents();

      this.cols = [
        {field: 'idStudent', header: 'ID'},
        {field: 'firstName', header: 'First Name'},
        {field: 'lastName', header: 'Last Name'},
        {field: 'email', header: 'Email'},
        {field: 'facultyDomain', header: 'Faculty domain'},
        {field: 'classroom', header: 'Class'},
        {field: 'coordinatingTeacher', header: 'Coordinating teacher'},
        {field: 'thesisStatus', header: 'Thesis status'}
      ];

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
        const worksheet = xlsx.utils.json_to_sheet(this.getStudents());
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



    reset() {
    this.first = 0;
  }


  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      // @ts-ignore
      let value1 = data1[event.field];
      // @ts-ignore
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order! * result);
    });
  }


  getStudents() {
    let students = [];
    for(let student of this.students) {
      //student.year = car.year.toString();
      students.push(student);
    }
    return students;
  }

  clear(table: Table) {
    table.clear();
  }

}
