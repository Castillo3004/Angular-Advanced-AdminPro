import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  private fb = inject( FormBuilder );
  private usuarioService = inject( UsuarioService );
  private fileUploadService = inject( FileUploadService );

  public perfilForm: FormGroup = new FormGroup({});
  public usuario: Usuario | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: any;


  ngOnInit(): void {

    this.usuario = this.usuarioService.usuario;

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario?.nombre, Validators.required ],
      email: [this.usuario?.email, [ Validators.required, Validators.email ] ],
    });


  }

  actualizarPerfil(){
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
      .subscribe( resp => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;

        Swal.fire('Usuario Actualizado', `Se ha actualizado el perfil de ${ this.usuario?.nombre }`, 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }


  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if( !file ) return this.imgTemp = null;

    const reader = new FileReader();

    reader.readAsDataURL( file );

    return reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){

    if(!this.imagenSubir?.type.includes('image/')){
      this.imgTemp = undefined;
      this.imagenSubir = undefined;
      return Swal.fire({ title: 'Error', text: 'Debe ser una imagen (png, jpg, jpeg)', icon: 'error' });
    }

    if( this.imagenSubir && this.usuario?.uid ){

      return this.fileUploadService.actualizarFoto( this.imagenSubir , 'usuarios', this.usuario?.uid )
      .then( img => {
        this.usuario!.img = img;
        Swal.fire('Imagen Actualizada', `Se ha actualizado la imagen`, 'success')
      })
    }
    return;

  }


}
