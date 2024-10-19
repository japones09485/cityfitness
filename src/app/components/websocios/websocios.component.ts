import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socios } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-websocios',
  templateUrl: './websocios.component.html',
  styleUrls: ['./websocios.component.css']
})
export class WebsociosComponent implements OnInit {
  socio:Socios;
  color1:string;
  color2:string;
  foto1:string;
  foto2:string;
  foto3:string;
  foto4:string;
  codigosoc:string;
  descripcion:string;
  pagina:string;
  pathIm = environment.pathImgs;

  constructor(private acRouter: ActivatedRoute,
              public api: ApiRestService) { }

  ngOnInit(): void {


    this.acRouter.params.subscribe(param => {
      this.api.traerxcodigo(param.codigo)
        .subscribe((data: any) => {

        this.socio = data.socio;
        this.color1 = this.socio.soc_color_primario;
        this.color2 = this.socio.soc_color_secundario;
        this.foto1 = this.socio.soc_ft1;
        this.foto2 = this.socio.soc_ft2;
        this.foto3 = this.socio.soc_ft3;
        this.foto4 = this.socio.soc_ft4;
        this.descripcion = this.socio.soc_descripcion;
        this.codigosoc = this.socio.soc_codigo;
        this.pagina = this.socio.soc_pagina;

        });
    });
  }

}
