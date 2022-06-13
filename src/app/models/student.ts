import {UserAccount} from "../services/authentication.service";
import {User} from "./user";

export class Student{
  idStudent: number | undefined;
  user: User | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  cnp: string | undefined;
}
