import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ApiRestService } from './services/api-rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Declaración para la función externa
declare function toDoBefore(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'entrenamiento';

  constructor(
    public serv: ApiRestService,
    private route: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // Ejecutar función externa
    this.initializeApp();
  }

  ngAfterViewInit() {
    // Cargar el tema basado en la URL después de que la vista se inicialice
    this.updateThemeBasedOnUrl();
  }

  /**
   * Método que ejecuta la función toDoBefore (declarada externamente)
   * y otras tareas necesarias al inicializar la app.
   */
  private initializeApp() {
    // Llamada a la función externa
    toDoBefore();

    // Lógica para inicializar el tema en función de la URL
    this.updateThemeBasedOnUrl();
  }

  /**
   * Método que actualiza el tema dependiendo de si la URL
   * contiene 'admin' o no.
   */
  private updateThemeBasedOnUrl() {
    const strUrl = this.route.url;
    const isAdmin = strUrl.includes('admin');
    const theme = isAdmin ? 'admin.css' : 'front.css';
    this.loadTheme(theme);
  }

  /**
   * Método que carga el archivo CSS dinámicamente en el head del documento.
   * Si el archivo ya está presente, solo actualiza el href; si no, lo crea.
   */
  private loadTheme(cssFile: string) {
    const headEl = this.document.getElementsByTagName('head')[0];
    const existingEl = this.document.getElementById('hoja-dinamyc') as HTMLLinkElement;

    // Si el elemento de la hoja de estilos existe, actualiza el href si es necesario
    if (existingEl) {
      const currentHref = existingEl.href;
      if (!currentHref.includes(cssFile)) {
        existingEl.href = cssFile;
      }
    } else {
      // Si no existe, crea un nuevo elemento link
      const linkElement = this.document.createElement('link');
      linkElement.id = 'hoja-dinamyc';
      linkElement.rel = 'stylesheet';
      linkElement.href = cssFile;
      headEl.appendChild(linkElement);
    }
  }
}
