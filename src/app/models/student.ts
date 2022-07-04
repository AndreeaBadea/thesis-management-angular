
export class Student {
idStudent!: number;
idUserAccount!: number;
firstName!: string;
lastName!: string;
cnp!: string;
faculty!: string;
facultyDomain!: string;
classroom!: string;


  constructor(idUserAccount: number, firstName: string, lastName: string, cnp: string, faculty: string, facultyDomain: string, classroom: string) {
    this.idUserAccount = idUserAccount;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cnp = cnp;
    this.faculty = faculty;
    this.facultyDomain = facultyDomain;
    this.classroom = classroom;
  }





}
