import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerApis } from 'src/app/api.constants';
import { User } from 'src/app/auth/user';
import { LoginModal } from 'src/app/models/LoginModal';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { Users } from 'src/app/models/User';
import { TransportService } from '../transport/transport.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from 'src/app/auth/userDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  helper = new JwtHelperService();

  user = new BehaviorSubject<any>(null);

  constructor(private transportService:TransportService,private toastrService: NbToastrService, private router: Router) { 
  }

  public jwtParcer(token:string){
    const decodeJWT = this.helper.decodeToken(token);
    return decodeJWT;
  }

  public clearUser(){
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getCurrentUser(){
    const user = localStorage.getItem('user')
    if(!user)
    {
      return null;
    }
    this.user.next(JSON.parse(user));
    const decode = this.jwtParcer(this.user.value.token);
    return new UserDetails(
      decode.sub,
      decode.role,
      decode.firstName,
      decode.lastName,
      decode.isActive,
      decode.userId
    );
  }

  public login(loginModal:LoginModal)
  {  
    this.transportService.
    CreateRaw<LoginResponse>(loginModal,ServerApis.userLoginURL).subscribe((data:LoginResponse)=>{
    this.afterSuccessfulLogin(data);
  },(error)=>{
    console.log(error);
    window.alert(error.error.responseObject);
  });
  }

  afterSuccessfulLogin(data:LoginResponse)
  {
    const user = new User(data.responseObject.token);
    this.user.next(user);

    localStorage.setItem('user', JSON.stringify(user));
    
    if(this.getCurrentUser()?.roleName === 'executiveSuperAdmin'){
      this.router.navigate(['/pages']);
    }else{
      this.router.navigate(['']);
    }
  }

  public autoLogin() 
    {
      const user = localStorage.getItem('user')
      if(!user)
      {
        return
      }
        this.user.next(JSON.parse(user));
        if(this.getCurrentUser()?.roleName === 'executiveSuperAdmin'){
          this.router.navigate(['/pages']);
        }else{
          this.router.navigate(['']);
        }
    }
  }
