import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {StudentsListService} from "../../_services/students-list.service";
import {Router, RouterModule} from "@angular/router";


@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private studentService: StudentsListService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      console.log("roles" + this.roles);
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;
    this.authService.authenticate(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token); ////
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        const idUserAccount  = this.tokenStorage.getUser().idUserAccount;
        console.log("idUserAccount" + idUserAccount);
        // this.reloadPage();
        if(this.isUserStudent(this.roles)){
          console.log("aaaaaaaaaaaaaaaa");
          this.router.navigate(['/students', idUserAccount]);
          console.log("aaaaaaassaaaaaaaaa");
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

    isUserStudent(roles : any): boolean{
    if(this.roles.includes("ROLE_USER")){
      return true;
    }
    return false;
  }

  isUserTeacher(roles : any): boolean{
    if(this.roles.includes("ROLE_TEACHER")){
      return true;
    }
    return false;
  }



  reloadPage(): void {
    window.location.reload();
  }
}
