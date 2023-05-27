import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {
 
  constructor(private authService: AuthServiceService, private router: Router) {}

  private redirect = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();
  
    if (token) {
      if (this.authService.isAdmin()) {
        const url = state.url;
        if (url !== '/admin') {
          this.router.navigate(['/admin']);
          return false; // return false to cancel the current navigation
        }
        return true;
      } else {
        const url = state.url;
        if (url !== '/home' && url !== '/consulter' && url !== '/fiche' ) {
          this.router.navigate(['/home']);
          return false; // return false to cancel the current navigation
        }
        return true;
      }
    } else {
      const url = state.url;
      if (url !== '/login') {
        this.router.navigate(['/login']);
        return false; // return false to cancel the current navigation
      }
      return false;
    }
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
