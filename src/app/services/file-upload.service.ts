import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  private baseUrl = environment.base_url;


  async actualizarFoto(archivo: File , tipo: 'usuarios' | 'medicos' | 'hospitales', id: string){

    try {

      const url = `${ this.baseUrl }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append( 'imagen', archivo );

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();


      if( data.ok ){
        return data.nombreArchivo
      }else{
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }


}
