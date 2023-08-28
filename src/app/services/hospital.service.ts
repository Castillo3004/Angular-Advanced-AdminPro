import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private http = inject( HttpClient );

  private base_url = environment.base_url;
  private url = `${ this.base_url }/hospitales`


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
  getHospitales(): Observable<Hospital[]>{

    return this.http.get<Hospital[]>( this.url , this.headers ).pipe(
      map( (resp: any) =>  resp.hospitales )
    )

  }

  crearHospital( nombre: string){

    return this.http.post( this.url, { nombre }, this.headers )
  }


  actualizarHospital( _id: string ,nombre: string ){

    return this.http.put( `${this.url}/${ _id }`, { nombre }, this.headers )
  }

  eliminarHospitalById( _id: string ){

    return this.http.delete( `${this.url}/${ _id }`, this.headers )
  }


}
