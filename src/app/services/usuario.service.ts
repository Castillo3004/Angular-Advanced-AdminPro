import { Observable, catchError, map, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';


import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


declare const google: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private base_url = environment.base_url;

  private http = inject( HttpClient );
  private router = inject( Router );
  private ngZone = inject( NgZone );


  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ this.base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true ),
      catchError( err => of(false))
    );

  }

  crearUsuario( formData: RegisterForm ){

    return this.http.post(`${ this.base_url }/usuarios`, formData ).pipe(
      tap( ( resp: any ) => {
        localStorage.setItem('token', resp.token );
      })
    );
  }


  login( formData: LoginForm ){

    return this.http.post(`${ this.base_url }/login`, formData, ).pipe(
      tap( ( resp: any ) => {
        localStorage.setItem('token', resp.token );
      })
    );
  }


  loginGoogle( token: string){
    return this.http.post(`${ this.base_url }/login/google`, { token }).pipe(
      tap( ( resp: any ) => {
        localStorage.setItem('token', resp.token );
      })
    )
  }


  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('castillolj3004@gmail.com', () => {

      this.ngZone.run( () =>{
        this.router.navigateByUrl('/login');
      });
    });
  }

}
