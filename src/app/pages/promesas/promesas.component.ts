import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{


  ngOnInit(): void {

    this.getUsuarios().then( usuarios =>{
      console.log(usuarios);
    });

    // const promesa = new Promise( (resolve, reject) => {

    //   if( false ){
    //     resolve('Hola Mundo');
    //   }else{
    //     reject('Algo salio mal');
    //   }

    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch( err => {
    //   console.log('Error en promesa', err);
    // })

    // console.log('Fin del Init');

  }


  getUsuarios() {

    const url: string = 'https://reqres.in/api/users';

    const promesa = new Promise( resolve =>{

      fetch( url )
        .then( resp => resp.json() )
        .then( body => resolve( body.data ) );

    });

    return promesa;




  }


}
