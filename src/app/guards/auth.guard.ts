import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}



  canActivate(): boolean {
   console.log('canactive');

    if ( this.authService.getUserRole() === "Centre D'appel") {
      this.router.navigate(['/home']);
      return true;
       
    } else {
      console.log(false);
      return false;
    }


  }
}
