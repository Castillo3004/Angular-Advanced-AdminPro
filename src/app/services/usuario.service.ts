import { Observable, catchError, map, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';


import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';


declare const google: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private base_url = environment.base_url;

  private http = inject( HttpClient );
  private router = inject( Router );
  private ngZone = inject( NgZone );

  public usuario: Usuario | undefined;


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario?.uid || '';
  }



  validarToken(): Observable<boolean>{

    return this.http.get(`${ this.base_url }/login/renew`,{
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { email, google, img, nombre, rol, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, rol, uid );
        localStorage.setItem('token', resp.token );
        return true;
      }),
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


  actualizarUsuario( data: { email:string, nombre: string, rol: string | undefined }){

    data = { ...data, rol: this.usuario?.rol}

    return this.http.put(`${ this.base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    })
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
