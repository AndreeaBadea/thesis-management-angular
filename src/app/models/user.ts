import {Role} from "./role";

export class User{
  idUserAccount: number | undefined ;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  token: string | undefined;
  roles: Role[] | undefined;
}
