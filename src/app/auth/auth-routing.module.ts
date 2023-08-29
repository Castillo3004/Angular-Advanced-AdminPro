import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { noAuthGuard } from '../guards/no-auth.guard';



const routes: Routes = [
  { path: 'login', canActivate: [ noAuthGuard ],component: LoginComponent },
  { path: 'register', canActivate: [ noAuthGuard ],component: RegisterComponent },
];



@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
