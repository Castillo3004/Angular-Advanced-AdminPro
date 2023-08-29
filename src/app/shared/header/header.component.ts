import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

declare function customSidebar(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  private usuarioService = inject( UsuarioService );
  private router = inject( Router );


  public usuario: Usuario | undefined;


  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    customSidebar();
  }


  busqueda( termino: string){

    if( termino.length === 0) return;

    return this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
