import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private fb = inject( FormBuilder );
  private usuarioService = inject( UsuarioService );
  private router = inject( Router );

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['Carlos', Validators.required],
    email: ['teste100@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required ],
    password2: ['123456', Validators.required ],
    terminos: [ true, Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  crearUsuario(){
    this.formSubmitted = true;

    if( this.registerForm.invalid ){
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( resp => {
        console.log('Usuario creado');
        console.log( resp );
        Swal.fire('Usuario Creado', '', 'success').then( res => {
          if( res.isConfirmed ){
            this.router.navigateByUrl('/');
          }
        });
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  campoNoValido(campo: string): boolean{

    if( this.registerForm.get( campo )?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }

  constrasenaNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( pass1 !== pass2 && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  passwordsIguales(pass1: string, pass2: string, ){

    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors( { noEsIgual: true } )
      }
    }

  }


}
