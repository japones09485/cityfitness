import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import {AuthService } from '../../../services/auth.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Socios,User,Paises } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-socio',
  templateUrl: './create-socio.component.html',
  styleUrls: ['./create-socio.component.css']
})
export class CreateSocioComponent implements OnInit {
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  user:User;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  pathIm = environment.pathImgs;
  nombrePais:String;
  imgCountry: String;

  constructor( public api: ApiRestService,
               private fb: UntypedFormBuilder,
               private authApi:AuthService,
               private router:Router) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.initForm();

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    console.log(this.paisesList);


  }

  initForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pagina: ['']
    });
  }

  CrearSocio(){
    this.frmGuardar.append('data', JSON.stringify(this.frmClasCreator.value));

    this.api.CrearSocio(this.frmGuardar)
      .subscribe((res: any) => {
        this.frmClasCreator.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;

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
