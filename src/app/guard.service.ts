import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth: boolean;
    isAuth = !!localStorage.getItem('currentUser');
    if (!isAuth && state.url.match(/^\/(listings|bookings)/ig)) {
      this.router.navigate(['/login']);
      return false;
    } else if ( isAuth && (state.url.match(/^\/(login|register|[]|[*]+)$/ig))) {
      if (localStorage.getItem('isAdmin')=='true')
        this.router.navigate(['/admin'])
      else
        this.router.navigate(['/listings']);
      return false;
    }
    return true;
  }

}
