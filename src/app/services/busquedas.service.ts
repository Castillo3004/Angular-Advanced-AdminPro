import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private http = inject(HttpClient);


  private base_url = environment.base_url;


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers():any{
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  private transformarUsuarios( resultados: any ): Usuario[] {
    return resultados.map(
      (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.rol )
    );
  }


  private transformarHospitales( resultados: any ): Hospital[] {
    return resultados;
  }

  private transformarMedicos( resultados: any ): Medico[] {
    return resultados;
  }



  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string ){

    const url = `${ this.base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers ).pipe(
      map( ( resp:any ) => {

        switch ( tipo ) {
          case 'usuarios':
            return this.transformarUsuarios( resp.resultados );
            break;

          case 'hospitales':
            return this.transformarHospitales( resp.resultados );
            break;

          case 'medicos':
            return this.transformarMedicos( resp.resultados );
            break;


          default:
            return [];
        }

      })
    );

  }



}
