import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-websociosempresasedit',
  templateUrl: './websociosempresasedit.component.html',
  styleUrls: ['./websociosempresasedit.component.css']
})
export class WebsociosempresaseditComponent implements OnInit {
  id_empresa:any;
  empresa:any;
  flagSave:boolean;
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  nomsocio:string;
  socio:any;
  user:any;
  constructor(private api: ApiRestService,
              private acRouter: ActivatedRoute,
              private fb: UntypedFormBuilder,
              private authApi:AuthService) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.user = this.authApi.getUser();

    this.api.traerIdSocio(this.user.usu_fk_socio)
    .subscribe((res:any)=>{
      this.socio = res.socio
      this.nomsocio = this.socio.soc_nombre;
    });
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
      this.api.TraerEmpresasId(this.id_empresa)
          .subscribe((res)=>{
          this.empresa = res['empresa'];
          this.popularForm();
          });

    });


  }



  inicializarForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram:  ['', Validators.required],
      pagina: ['', [Validators.required]]
    });
  }


  popularForm() {
    this.frmClasCreator.patchValue({
      nombre: this.empresa.imps_nombre,
      descripcion: this.empresa.imps_descripcion,
      facebook: this.empresa.imps_facebook,
      instagram: this.empresa.imps_instagram,
      pagina: this.empresa.imps_pagina,
    });
  }



  editarEmpresa(){


    this.frmGuardar.append('data', JSON.stringify( this.frmClasCreator.value));
    this.frmGuardar.append('socio', JSON.stringify( this.empresa.id_emps));

    this.api.editarEmpresaws(this.frmGuardar)
      .subscribe((res:any)=>{
        this.empresa = res['empresa'];
        this.frmClasCreator.reset();
        this.api.mensajeUser = 'Empresa creada correctamente';
        this.api.mostrarMsj = true;
        this.popularForm();

      });
  }

  agregarArchivo(event: any, numImg: number) {

    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }
  }

}
