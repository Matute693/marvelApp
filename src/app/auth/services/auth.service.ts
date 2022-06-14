import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiEndPoint;
  private _auth: AuthUser | undefined;

  get auth(): AuthUser {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient) { }

  // Keep me open method declared in the guard  
  authVerification(): Observable<boolean> {
    if( !localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<AuthUser>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        this._auth = auth;
        return true;
      })
    )

  }

  login() {
   return this.http.get<AuthUser>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('token', auth.id))
    )
  }

  logOut() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }


}
