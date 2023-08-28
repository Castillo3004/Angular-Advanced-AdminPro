import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';



@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private http = inject( HttpClient );

  private base_url = environment.base_url;
  private url = `${ this.base_url }/medicos`

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

  // CRUD

  getMedicos(): Observable<Medico[]>{

    return this.http.get<Medico[]>( this.url, this.headers).pipe(
      map( (resp: any) => resp.medicos )
    )
  }


  getMedicoById( id: string): Observable<Medico>{

    return this.http.get<Medico>( `${ this.url }/${ id }`, this.headers).pipe(
      map( (resp: any) => resp.medico )
    )
  }


  crearMedico( medico: { nombre: string, hospital: string }){
    return this.http.post( this.url, medico, this.headers)
  }


  actualizarMedico( medico: Medico ){
    return this.http.put(` ${ this.url }/${ medico._id }`, medico, this.headers )
  }

  eliminarMedicoById( _id: string ){
    return this.http.delete(`${ this.url }/${ _id }`, this.headers )
  }

}
