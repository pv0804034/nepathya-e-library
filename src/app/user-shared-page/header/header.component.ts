import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any = [];

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getCurrentUser();
  }

  logout(){
    this.loginService.clearUser();
  }

  isEmpty(){
    return this.loginService.getCurrentUser() === null;
  }

  isSuperAdmin(){
    if(this.loginService.getCurrentUser() == null)return false;
    return this.loginService.getCurrentUser()?.roleName == 'executiveSuperAdmin';
  }
}
