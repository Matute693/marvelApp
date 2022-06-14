import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService, private router: Router) {

  }

  // Utilizar canActive cuando no se utilize lazy load en la carga modular
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {

      return this.authService.authVerification()
      .pipe(
        tap(state => {
          if( !state ) {
            this.router.navigate(['./auth/login']);
          }
        })
      )

    //   if(this.authService.auth.id) {
    //     return true
    //   }
    //   console.log('Block by AuthGuard - CanActivate')
    // return false;
  }

  // Puede cargar el modulo cuando el usuario ya este logueado - uitlizarlo CanLoad con Lazy load
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.authService.authVerification()
      .pipe(
        tap( state => {
          if( !state ) {
            this.router.navigate(['./login/auth']);
          }
        } )
      )

    //   if(this.authService.auth.id) {
    //     return true
    //   }
    //   console.log('Block by AuthGuard - CanLoad')
    // return false;
  }
}
