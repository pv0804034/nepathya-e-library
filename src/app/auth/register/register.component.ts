import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/models/Request/UserRequest';
import { FacultyResponse } from 'src/app/models/Response/FacultyResponse';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { UsersService } from 'src/app/service/users/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public submitted = false;
  loading = false;
  registerForm: FormGroup;

  public faculties: FacultyResponse[] = [];
  
  constructor(private facultyService: FacultyService, private userService: UsersService,private router: Router) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('',[ Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, 
       // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      faculty: new FormControl(''),
      year: new FormControl('')
    },
    )
   }

   

  ngOnInit(): void {
    this.getAllFaculty();
  }


  registerUser() {
    this.submitted = true;
    console.log("haribol");
    if (this.registerForm.invalid) {
        return;
    }
    const user:UserRequest = new UserRequest();
    user.email = this.registerForm.value.email;
    user.faculty = this.registerForm.value.faculty;
    user.firstName = this.registerForm.value.firstname;
    user.lastName = this.registerForm.value.lastname;
    user.year = this.registerForm.value.year;
    user.phone = this.registerForm.value.phone;
    user.password = this.registerForm.value.password;
    this.userService.createUser(user).subscribe((data:any) =>{
      console.log(data);
      this.loading = false;
      window.alert("success");
      this.router.navigate(['/login']);
    },(error) =>{
      window.alert("error occured tru again");
      this.loading = false;
    }
    );
  }

  public getAllFaculty() {
    this.facultyService.getAll().subscribe((data: any) => {
      this.faculties = data.responseObject;
    })
  }

}
