import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from '../../services/busquedas.service';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{

  private busquedasService =  inject( BusquedasService );
  private router =  inject( Router );
  private activatedRoute =  inject( ActivatedRoute );


  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ))

  }


  busquedaGlobal( termino: string){

    this.busquedasService.buscarGlobal( termino)
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
      });
  }

  abrirMedico( medico: Medico ){
    const id = medico._id;
    this.router.navigateByUrl(`/dashboard/medico/${ id }`)
    console.log(medico);

  }



}
