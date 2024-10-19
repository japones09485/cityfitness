import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AliadosService } from '../../../services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import {AuthService } from '../../../services/auth.service';
import { User, ListAlumnos,Paises,RespuestaPaises } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  frmAlumCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  sucess:boolean;
  mensaje: string;
  user: User;
  idAlid:number;
  meses:number;
  alumnos: ListAlumnos[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathImg = environment.pathImgs;

  constructor(private fb: UntypedFormBuilder,
              public router: Router,
              private apiAlid:AliadosService,
              private api:ApiRestService,
              private authApi:AuthService) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.idAlid =  this.user.usu_id;
    this.initForm();
    this.apiAlid.ListarAlumnos(this.idAlid)
      .subscribe((res:any)=>{1
        this.alumnos = res.alumnos;
      });

      this.api.getPaises()
      .subscribe((res:RespuestaPaises)=>{
        this.paises = res.lista
      });
  }

  initForm(){
    this.frmAlumCreator = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      meses: ['', Validators.required]
    });
  }

  Inscripcion(){
    this.apiAlid.InscribirAlumno( this.frmAlumCreator.value,this.idAlid )
    .subscribe(( res:any )=>{
      this.sucess = true;
      if(res.sucess == true){
        this.initForm();
        this.alumnos.unshift(res.alumno);
      }
      this.mensaje = res.mensaje
      setTimeout(() => {
        this.initForm();
        this.sucess = false;
      }, 4000);
    });
  }



  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

  ampliarSubsripcion(id_alum:number, meses:number, fecha_fin:string){
    this.apiAlid.ampliarSubsripcion(id_alum ,this.idAlid,fecha_fin, meses )
    .subscribe((res:any)=>{
     if(res.sucess == true){
      this.ngOnInit();
     }
    });
  }

}
