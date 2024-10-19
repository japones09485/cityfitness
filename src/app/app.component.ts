import { Component, Inject, DoCheck, OnInit } from '@angular/core';
import { ApiRestService } from './services/api-rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Declaration for method in JS OUT
declare function toDoBefore(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'entrenamiento';

  constructor(
    public serv: ApiRestService,
    private route: Router,
    @Inject(DOCUMENT) private document: Document) { }


  ngOnInit() {
    toDoBefore();
  }

  ngDoCheck() {
    const strUrl = this.route.url;
    const bsq = strUrl.indexOf('admin');
    if (bsq === -1) {
      this.loadTheme('front.css');
    } else {
      this.loadTheme('admin.css');
    }
  }

  loadTheme(cssFile: string) {
    const headEl = this.document.getElementsByTagName('head')[0];
    const existinEl = this.document.getElementById('hoja-dinamyc') as HTMLLinkElement;
    if (existinEl) {
      const hr = existinEl.href;
      const bsq = hr.indexOf(cssFile);
      if (bsq === -1) {
        //console.log('reemplazo');
        existinEl.href = cssFile;
      }
    } else {
      const linkElement = this.document.createElement('link');
      linkElement.id = 'hoja-dinamyc';
      linkElement.rel = 'stylesheet';
      linkElement.href = cssFile;
      headEl.appendChild(linkElement);
    }
  }
}
