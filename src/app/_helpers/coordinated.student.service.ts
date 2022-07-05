import {Project} from "../models/project";
import {HttpClient} from "@angular/common/http";
import {CoordinatedStudent} from "./coordinated-student";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CoordinatedStudentService {

private coordinatedStudents: CoordinatedStudent[] = [
  {
    'idCoordinatedStudent' : 1,
    'studentName': 'Raluca Mihaila',
    'classRoom': '342A3',
    'projectTitle': 'Aplicatie pentru PetShop'
  },
  {
    'idCoordinatedStudent' : 2,
    'studentName': 'Andreea Badea',
    'classRoom': '342B3',
    'projectTitle': 'Dezvoltarea unei aplicatii de gestionare a temelor de licenta intr-o facultate'
  },

];

constructor(){}

public getAllCoordinatedStudents() : CoordinatedStudent[]{
  return this.coordinatedStudents;
}


}
