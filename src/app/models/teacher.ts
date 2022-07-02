import {Project} from "./project";

export class Teacher{
  idTeacher!: number;
  idUserAccount!: number;
  firstName!: string;
  lastName!: string;
  cnp!: string;
  faculty!: string;
  numberOfStudents!: number;
  projectList!: Project[];
}
