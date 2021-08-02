import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public submitted = false;
  loading = false;
  changePassword: FormGroup;

  constructor() {
    this.changePassword = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

  onChangePassword() {
    this.submitted = true;
    if (this.changePassword.invalid) {
        return;
    }
    this.loading = true;
  }

}
