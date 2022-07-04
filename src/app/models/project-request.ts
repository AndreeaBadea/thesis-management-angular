import {Student} from "./student";
import {Project} from "./project";

export class ProjectRequest{
  idProjectRequest!: number;
  student!: Student;
  idStudent!: number
  studentName!: string;
  project!: Project;
  projectTitle!: string;

}
