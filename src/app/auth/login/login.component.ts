import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModal } from 'src/app/models/LoginModal';
import { LoginService } from 'src/app/service/auth/login.service';
import { PasswordService } from 'src/app/service/password/password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading = false;
  loginForm: FormGroup;
  loginModal: LoginModal;

  constructor(public passwordService: PasswordService,private authenticationService: LoginService
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.loginModal={};
   }

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }


  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.setUserValue();
    this.authenticationService.login(this.loginModal)
  }

  
  setUserValue()
  {
      this.loginModal.email=this.f.username.value;
      this.loginModal.password=this.f.password.value;
  }

}
