import {Role} from "./role";

export class User{
  idUser: number | undefined ;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  roles: Role[] | undefined;
}
