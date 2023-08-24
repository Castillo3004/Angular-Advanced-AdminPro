

export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public goole?: boolean,
    public rol?: string,
    public uid?: string
  ){}

}
