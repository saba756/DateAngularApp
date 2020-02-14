import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService ,
              private alertify: AlertifyService,
              private router: Router) { }

  canActivate(): boolean  {
    if(this.authService.loggedIn()){
      return true;
    }
    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
