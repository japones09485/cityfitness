import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-front-websociosempresas',
  templateUrl: './front-websociosempresas.component.html',
  styleUrls: ['./front-websociosempresas.component.css']
})
export class FrontWebsociosempresasComponent implements OnInit {
  codigo: string;
  empresas:any;
  pathIm = environment.pathImgs;
  nombreSocio: string;
  logoSocio: string;
  foto1: string;
  id_empresasSoc :number;
  constructor(private api: ApiRestService,
              private acRouter: ActivatedRoute,
              private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.codigo = param.id;
      this.api.traerempresasXcodigo(this.codigo)
      .subscribe((res:any)=>{
        this.empresas = res.empresas;
        this.nombreSocio = this.empresas[0]['soc_nombre'];
        this.logoSocio = this.empresas[0]['soc_ft1'];
        this.foto1= this.empresas[0]['soc_ft2'];
        this.id_empresasSoc = this.empresas[0]['id_emps'];
        sessionStorage.clear();
        sessionStorage.setItem('id_empresasSoc', JSON.stringify(this.id_empresasSoc));

        });

    });
  }

}
