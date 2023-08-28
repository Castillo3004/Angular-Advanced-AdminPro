import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../guards/auth-guard.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';




const routes: Routes =[
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta'}  },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Graficas'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS'} },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario'} },

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuario de aplicación'} },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Medico'} },
    ]
  },

];



@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})
export class PagesRoutingModule { }
