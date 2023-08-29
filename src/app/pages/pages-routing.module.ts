import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, CantMatch } from '../guards/auth-guard.guard';

import { PagesComponent } from './pages.component';




const routes: Routes =[
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canMatch: [ CantMatch ],
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  },

];



@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})
export class PagesRoutingModule { }
