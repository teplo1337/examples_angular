import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authDataSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if the token was deleted
      this.authDataSub = this.authDataSub || this.authService.authData$
        .subscribe(ad => !ad.accessToken && this.router.navigate(['/login']));

      return this.authService.authData$
      .pipe(map(aData => !!aData.accessToken))
      .pipe(tap(t => !t && this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })));
  }
}
