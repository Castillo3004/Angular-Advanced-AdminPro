import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';


import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';



export const AuthGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject( UsuarioService );
  const router = inject( Router );

  return usuarioService.validarToken().pipe(
    tap( isAuth => {

      if( !isAuth ){
        router.navigateByUrl('/login');
      }
    })
  );
};


export const CantMatch: CanMatchFn = () => {

  const usuarioService = inject( UsuarioService );
  const router = inject( Router );


  return usuarioService.validarToken().pipe(
    tap( isAuth => {

      if( !isAuth ){
        router.navigateByUrl('/login');
      }
    })
  )

}
