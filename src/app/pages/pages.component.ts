import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;   // Se llama el codigo desde Angular, el cual esta en js de la plantilla que esta en assets

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

  private settingsService = inject(SettingsService);

  ngOnInit(): void {
    customInitFunctions();
  }

}
