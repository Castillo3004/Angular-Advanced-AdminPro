import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;


export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public rol?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string,
  ){}


}
