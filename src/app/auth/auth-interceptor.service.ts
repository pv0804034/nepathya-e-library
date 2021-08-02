import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { LoginService } from '../service/auth/login.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }
        const authHeader = `Bearer ${user.token}`;

        const authReq = req.clone({
          headers: req.headers.set('authorization', authHeader),
        });
        return next.handle(authReq);
      })
    );
  }
}
