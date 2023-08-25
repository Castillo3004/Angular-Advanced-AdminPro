import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

declare function customSidebar(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  private usuarioService = inject( UsuarioService );
  public usuario: Usuario | undefined;


  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    customSidebar();
  }

}
