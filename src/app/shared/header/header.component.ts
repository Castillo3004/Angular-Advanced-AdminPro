import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

declare function customSidebar(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  private usuarioService = inject( UsuarioService );

  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    customSidebar();
  }

}
