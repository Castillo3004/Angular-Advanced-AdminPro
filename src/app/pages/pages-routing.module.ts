import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.guard';
import { AdminGuard } from '../guards/admin.guard';

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
import { BusquedaComponent } from './busqueda/busqueda.component';




const routes: Routes =[
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [

      // Practica
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Graficas'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS'} },

      // General
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta'}  },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas'} },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario'} },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Medico'} },

      // Rutas de Admin
      { path: 'usuarios', canActivate: [ AdminGuard ],component: UsuariosComponent, data: { title: 'Usuario de aplicación'} },
    ]
  },

];



@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})
export class PagesRoutingModule { }
