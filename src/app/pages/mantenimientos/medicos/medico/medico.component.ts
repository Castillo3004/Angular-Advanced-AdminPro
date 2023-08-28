import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';
import { delay } from 'rxjs';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit{

  public fb = inject( FormBuilder );
  public router = inject( Router );
  private medicoService = inject( MedicoService );
  private hospitalService = inject( HospitalService );
  private activatedRoute = inject( ActivatedRoute );


  public medicoForm: FormGroup = new FormGroup({});
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;
  public rutaActiva?: string;


  ngOnInit(): void {


    this.activatedRoute.params
      .subscribe( ({ id }) => {
        this.cargarmedicoById( id );
        this.rutaActiva = id;
    })


    this.medicoForm = this.fb.group({
      nombre: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });

    this.cargarHospitalById();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId );
      })

  }




  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico( data )
        .subscribe( resp => {
          console.log(resp);
          Swal.fire('Médico Actualizado', `El Medico ${ nombre } ha sido actualizado correctamente`, 'success')
        })

    }else{

      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( ( resp: any ) => {
          Swal.fire('Médico Creado', `El Medico ${ nombre } ha sido creado correctamente`, 'success')
            .then( () =>
              this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
            )
        });
    }

  }


  cargarmedicoById( medicoId: string ){

    if( medicoId === 'nuevo') return;

    return this.medicoService.getMedicoById( medicoId ).pipe(
      delay( 200 )
    ).subscribe( (medico: any) => {
        const { nombre, hospital:{ _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
        return;
      }, (err) => {
        return this.router.navigateByUrl('/dashboard/medicos');
      });

  }


  cargarHospitalById(){

    this.hospitalService.getHospitales()
      .subscribe( (hospitales: Hospital[]) =>  {
        this.hospitales = hospitales;
      })
  }

}
