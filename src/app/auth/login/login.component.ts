import { AfterViewInit, Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  private router = inject( Router );
  private fb = inject( FormBuilder );
  private usuarioService = inject( UsuarioService );
  private ngZone = inject( NgZone );

  public formSubmitted = false;



  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [ false ],
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "555304562915-38cedshscn1ddd9gv196a7hgh7igncuc.apps.googleusercontent.com",
      callback: (response: any) =>  this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { shape: "circle", theme: "filled_black", size: "large" }
    );
  }

  handleCredentialResponse( response: any ){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        this.ngZone.run( () => {
          this.router.navigateByUrl('/');
        });
      });
  }



  login(){

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value );
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' );
      });

  }

}
