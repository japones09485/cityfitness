import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../../services/auth.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Socios,Paises } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit-socio',
  templateUrl: './edit-socio.component.html',
  styleUrls: ['./edit-socio.component.css']
})
export class EditSocioComponent implements OnInit {

  socio:any = {};
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  pathIm = environment.pathImgs;
  nombrePais:String;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];



  constructor(public api: ApiRestService,
    private fb: UntypedFormBuilder,
    private authApi:AuthService,
    private router:Router,
    private acRouter: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {
       this.api.traerIdSocio(param.id)
         .subscribe((res:any)=>{
            this.socio = res.socio;
            this.initForm();
         })
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.initForm();
  }

  initForm(){

    this.frmClasCreator = this.fb.group({
      nombre: [this.socio.soc_nombre, Validators.required],
      descrip: [this.socio.soc_descripcion, Validators.required],
      color1: [this.socio.soc_color_primario, Validators.required],
      color2: [this.socio.soc_color_secundario, Validators.required],
      pais: [this.socio.soc_pais, Validators.required],
      telefono:[this.socio.soc_telefono, Validators.required],
      facebook: [this.socio.soc_facebook],
      instagram: [this.socio.soc_instagram],
      email:  [this.socio.soc_email, Validators.required],
      pagina: [this.socio.soc_pagina]
    });

  }



  EditarSocio(){
    const payload = {
      id_edit: this.socio.soc_id,
      data: this.frmClasCreator.value
    };

   this.frmGuardar.append('data', JSON.stringify(payload));
    this.api.editarSocio(this.frmGuardar)
      .subscribe((res:any)=>{
        this.socio = res.data;

        this.api.mensajeUser = 'Editado correctamente';
        this.api.mostrarMsj = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });

  }


  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }
  }

  cambioPais() {
    this.banderaPais(this.frmClasCreator.get('pais').value);
  }

  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

}
