import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

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
export class SidebarComponent {

  menuItems: any[] = [];

  private sidebarService = inject( SidebarService );

  constructor(){
    this.menuItems = this.sidebarService.menu;
  }


}
