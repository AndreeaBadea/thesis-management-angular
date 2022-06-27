import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {StudentList} from "../models/student-list";

@Injectable({
  providedIn: 'root'
})
export class StudentsListService {
  private AUTH_API = "http://localhost:8080"


  private STUDENTS: StudentList[] = [
    {"idStudent": 1,
      "firstName": "Andreea",
      "lastName": "Badea",
      "email": "andreea.badea@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "342B3",
      "coordinatingTeacher": "Alexandru Moisescu",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 2,
      "firstName": "Raluca",
      "lastName": "Mihaila",
      "email": "raluca.mihaila@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "342A3",
      "coordinatingTeacher": "",
      "thesisStatus": "UNALLOCATED"
    },
    {"idStudent": 3,
      "firstName": "Andrei",
      "lastName": "Radu",
      "email": "andrei.radu@stud.acs.upb.ro",
      "facultyDomain": "CTI",
      "classroom": "341C5",
      "coordinatingTeacher": "Cristian Popescu",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 4,
      "firstName": "Matei",
      "lastName": "Ionescu",
      "email": "matei.ionescu@stud.acs.upb.ro",
      "facultyDomain": "CTI",
      "classroom": "341C2",
      "coordinatingTeacher": "Andrei Radulescu",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 5,
      "firstName": "Anca",
      "lastName": "Cristea",
      "email": "anca.cristea@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "342B1",
      "coordinatingTeacher": "",
      "thesisStatus": "UNALLOCATED"
    },
    {"idStudent": 6,
      "firstName": "Alexandra",
      "lastName": "Enache",
      "email": "alexandra.enache@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "341A2",
      "coordinatingTeacher": "",
      "thesisStatus": "UNALLOCATED"
    },
    {"idStudent": 7,
      "firstName": "Lucian",
      "lastName": "Scutariu",
      "email": "lucian.scutariu@stud.acs.upb.ro",
      "facultyDomain": "CTI",
      "classroom": "342C1",
      "coordinatingTeacher": "Andrei Radulescu",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 8,
      "firstName": "Vlada",
      "lastName": "Ciubuc",
      "email": "vlada.ciubuc@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "342B1",
      "coordinatingTeacher": "",
      "thesisStatus": "UNALLOCATED"
    },
    {"idStudent": 9,
      "firstName": "Razvan",
      "lastName": "Melinte",
      "email": "razvan.melinte@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "341A1",
      "coordinatingTeacher": "",
      "thesisStatus": "UNALLOCATED"
    },
    {"idStudent": 10,
      "firstName": "Monica",
      "lastName": "Radu",
      "email": "monica.radu@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "342B3",
      "coordinatingTeacher": "Andrei Moise",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 10,
      "firstName": "Corina",
      "lastName": "Dumitrescu",
      "email": "corina.dumitrescu@stud.acs.upb.ro",
      "facultyDomain": "CTI",
      "classroom": "341C3",
      "coordinatingTeacher": "Aniela Mihailescu",
      "thesisStatus": "ALLOCATED"
    },
    {"idStudent": 11,
      "firstName": "Antonio",
      "lastName": "Bekesi",
      "email": "razvan.melinte@stud.acs.upb.ro",
      "facultyDomain": "IS",
      "classroom": "341A1",
      "coordinatingTeacher": "Andrei Radulescu",
      "thesisStatus": "UNALLOCATED"
    }
  ];


  constructor(private http : HttpClient) { }

  // public getAllStudents() : Observable<Student[]>{
  //   return this.http.get<Student[]>(this.AUTH_API + '/students');
  // }

  public getAllStudents() : StudentList[]{
    return this.STUDENTS;
  }

}
