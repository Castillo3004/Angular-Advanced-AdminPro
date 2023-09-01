import { Observable, catchError, map, of, tap } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';


import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

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

  get rolCurrentUser(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario!.rol || 'USER_ROLE';
  }


  get headers():any{
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  guardarLocalStorage( token: string, menu: any) {
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }



  // CRUD

  getUsuarios( desde: number = 0): Observable<CargarUsuario>{

    const url = `${ this.base_url }/usuarios?desde=${ desde }`;

    return this.http.get<CargarUsuario>( url, this.headers ).pipe(
      map( (resp: any) => resp),
      map( (resp: any) => {
        const usuarios = resp.usuarios.map(
          (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.rol, user.uid )
        );
        return {
          total: resp.total,
          usuarios
        };
      })

    )

  }


  crearUsuario( formData: RegisterForm ){

    return this.http.post(`${ this.base_url }/usuarios`, formData ).pipe(
      tap( ( resp: any ) => {
        this.guardarLocalStorage(resp.token, resp.menu );
      })
    );
  }


  actualizarUsuario( data: { email:string, nombre: string, rol: string | undefined }){

    data = { ...data, rol: this.usuario?.rol}

    return this.http.put(`${ this.base_url }/usuarios/${ this.uid }`, data, this.headers)
  }

  deleteUserById( usuario: Usuario ){

    const url = `${ this.base_url }/usuarios/${ usuario.uid }`
    return this.http.delete(url, this.headers );
  }

  guardarUsuario( usuario: Usuario){

    return this.http.put(`${ this.base_url }/usuarios/${ usuario.uid }`, usuario, this.headers)
  }


  // Auth

  validarToken(): Observable<boolean>{

    return this.http.get(`${ this.base_url }/login/renew`, this.headers).pipe(
      map( (resp: any) => {

        const { email, google, img = '', nombre, rol, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, rol, uid );

        this.guardarLocalStorage(resp.token, resp.menu );

        return true;
      }),
      catchError( err => of(false))
    );

  }


  login( formData: LoginForm ){

    return this.http.post(`${ this.base_url }/login`, formData ).pipe(
      tap( ( resp: any ) => {
        this.guardarLocalStorage(resp.token, resp.menu );

      })
    );
  }


  loginGoogle( token: string){

    return this.http.post(`${ this.base_url }/login/google`, { token }).pipe(
      tap( ( resp: any ) => {
        this.guardarLocalStorage(resp.token, resp.menu );

      })
    )
  }


  logout(){

    localStorage.removeItem('menu');
    localStorage.removeItem('authStatus');


    google.accounts.id.initialize({
      client_id: "555304562915-38cedshscn1ddd9gv196a7hgh7igncuc.apps.googleusercontent.com",
    });

    google.accounts.id.revoke('castillolj3004@gmail.com', () => {

      this.ngZone.run( () =>{
        this.router.navigateByUrl('/login');
        localStorage.removeItem('token');
      });
    });
  }

}
