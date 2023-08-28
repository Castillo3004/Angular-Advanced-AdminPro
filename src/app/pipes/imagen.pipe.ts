import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'getImagen'
})
export class ImagenPipe implements PipeTransform {


  private baseUrl = environment.base_url;

  transform(img: string | undefined, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if( !img ) {
      return `${ this.baseUrl }/uploads/${ tipo }/no-img`;
    }else if ( img?.includes('https://lh3.googleusercontent.com')){
      return img;
    } else if( img ){
      return `${ this.baseUrl }/uploads/${ tipo }/${ img }`
    }else{
      return `${ this.baseUrl }/uploads/${ tipo }/no-img`;
    }


  }

}
