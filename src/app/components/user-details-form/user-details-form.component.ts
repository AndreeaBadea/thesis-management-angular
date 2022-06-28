import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserDetailsService} from "../../_services/user-details.service";
import {Student} from "../../models/student";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent implements OnInit {
  userDetailsForm! : FormGroup;
  private student!: Student;
  idUser!: number;
  errorMessage = '';



  constructor(private formBuilder: FormBuilder,
              private userDetailsService: UserDetailsService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    console.log("aiiici");

    this.activatedRoute.params.subscribe(params => {
      // this.idUser = parseInt(<string>this.activatedRoute.snapshot.params.get('id'));
      //console.log("aa" + this.activatedRoute.snapshot.paramMap.get('idUserAccount'));
      this.idUser = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('idUserAccount'));
      //console.log("id userr" + this.idUser);
    })

    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.required]],
      cnp: ['', Validators.min(13)],
      faculty: ['', Validators.required],
      facultyDomain: ['', Validators.required],
      classroom: ['', Validators.required]

    })
  }

  onSubmit(){
     this.student = {
      idUserAccount: this.idUser,
      firstName: this.userDetailsForm.value.firstName,
      lastName: this.userDetailsForm.value.lastName,
      cnp: this.userDetailsForm.value.cnp,
      faculty: this.userDetailsForm.value.faculty,
      facultyDomain: this.userDetailsForm.value.facultyDomain,
      classroom: this.userDetailsForm.value.classroom
    }
    console.log(this.student);
    this.userDetailsService.saveStudent(this.student.idUserAccount, this.student).subscribe(data =>
    {
      console.log(data);
    },
      err => {
        this.errorMessage = err.error.message
        console.log("eroare" + this.errorMessage);
      }
  )

  }

}
