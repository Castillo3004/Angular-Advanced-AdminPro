import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';

import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  private medicoService = inject( MedicoService );
  private modalImagenService = inject( ModalImagenService );
  private busquedasService = inject( BusquedasService );

  public imgSubs: Subscription = new Subscription;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;



  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(300)
    ).subscribe( img => this.cargarMedicos() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  // CRUD

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.getMedicos()
      .subscribe( medicos => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      })

  }

  borrarMedico( medico: Medico ) {
    return Swal.fire({
      title: 'Borrar Medico',
      text: `Esta a punto de borrar a ${ medico.nombre }` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedicoById( medico._id! )
          .subscribe( resp => {
            this.cargarMedicos();
            Swal.fire( 'Borrado', `El Usuario ${ medico.nombre} se ha borrado exitosamente`, 'success')
        });
      }
    });
  }

  // Varios

  busqueda( termino: string ){
    if( termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }

    return this.busquedasService.buscar( 'medicos', termino)
      .subscribe( resp =>{
        this.medicos = resp as Medico[];
      });

  }


  abrirModal( medico: Medico ){

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img );
  }


}
