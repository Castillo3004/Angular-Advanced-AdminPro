import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;


export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public rol?: string,
    public uid?: string
  ){}

    get imagenUrl() {

      if ( this.img?.includes('https://lh3.googleusercontent.com')){
        return this.img;
      }


      if( this.img ){
        return `${ baseUrl }/uploads/usuarios/${ this.img }`
      }else{
        return `${ baseUrl }/uploads/usuarios/no-image`
      }

    }

}
