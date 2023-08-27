import { Component, inject } from '@angular/core';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'component-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public modalImagenService = inject( ModalImagenService );
  public fileUploadService = inject( FileUploadService );

  public imagenSubir: File | undefined;
  public imgTemp: any;



  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    if(!this.imagenSubir?.type.includes('image/')){
      this.imgTemp = undefined;
      this.imagenSubir = undefined;
      return Swal.fire({ title: 'Error', text: 'Debe ser una imagen (png, jpg, jpeg)', icon: 'error' });
    }

    if( this.imagenSubir && id ){

      return this.fileUploadService.actualizarFoto( this.imagenSubir , tipo , id )
      .then( img => {
        Swal.fire('Imagen Actualizada', `Se ha actualizado la imagen`, 'success');

        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
    }
    return;


  }



}
