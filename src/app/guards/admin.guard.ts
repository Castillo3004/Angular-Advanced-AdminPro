import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';




export const AdminGuard: CanActivateFn = (route, state) => {


  const usuarioService = inject( UsuarioService );
  const router = inject( Router );

  if( usuarioService.rolCurrentUser === 'ADMIN_ROLE' ){
    return true;
  }else {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('authStatus');
    router.navigateByUrl('/login');
    return false;
  }

};
