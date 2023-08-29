import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const noAuthGuard: CanActivateFn = (route, state) => {

  const router = inject( Router );

  const authStatus = localStorage.getItem('authStatus');

  if( authStatus === 'Authenticated'){
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
