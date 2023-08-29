import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    .has-arrow.waves-effect.waves-dark.active {
      background: transparent;
    }
    `
  ]
})
export class SidebarComponent implements OnInit{

  public menuItems: any[] = [];
  public usuario: Usuario | undefined;


  private sidebarService = inject( SidebarService );
  private usuarioService = inject( UsuarioService );

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }


}
