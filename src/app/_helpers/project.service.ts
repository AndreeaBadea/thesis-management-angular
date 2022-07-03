import { Injectable } from '@angular/core';
import {Project} from "../models/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECTS: Project[] = [
    {
      "idProject" : 1,
      "projectTitle" : "Aplicatie web pentru comert electronic",
      "projectDescription": "Prin intermediul aplicatiei se doreste comertul de carti." +
                            " Pentru implementare sunt necesare cunostiinte de Java, Spring Boot, SQL, Angular.",
      "teacherName": "Dan Munteanu",
      "projectAvailability": "ALLOCATED"
    },
    {
      "idProject" : 2,
      "projectTitle" : "Aplicatie web pentru laborator de fizica",
      "projectDescription": "Prin intermediul aplicatiei se doreste determinarea coeficientului de conductibilitate" +
        " termica al unei bare printr-o metoda stationara" +
        " Pentru implementare sunt necesare cunostiinte de Python, Modelare si Simulare, React.",
      "teacherName": "Ionela Tudorie",
      "projectAvailability": "AVAILABLE"
    },
    {
      "idProject" : 3,
      "projectTitle" : "Sistem informatic pentru rezervari online",
      "projectDescription": "Prin intermediul aplicatiei se doreste realizarea de rezervari online " +
        "la mai multe restaurante"+
        " Pentru implementare sunt necesare cunostiinte de Spring Boot, Java, PostgresSQL, AWS.",
      "teacherName": "Dan Munteanu",
      "projectAvailability": "AVAILABLE"
    },
  ];

  constructor(private http : HttpClient) { }

  public getAllProjects() : Project[]{
    return this.PROJECTS;
  }

}
