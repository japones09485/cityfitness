import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User, Examen,Pregunta} from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  id_empresa:number;
  id_examen:number;
  numpreg:number;
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  examen: Examen;
  mensaje: string;
  sucess:boolean;
  user:User;
  idExamen:number;
  arrnumpreg=[];
  preguntas: Pregunta[] = [];
  validul:boolean;
  crrmd:boolean;
  validalm=true;

  constructor(private fb: UntypedFormBuilder,
              private apiAlid: AliadosService,
              private authApi:AuthService,
              private router:Router,
              private acRouter: ActivatedRoute,) { }

  ngOnInit(): void {

    this.user = this.authApi.getUser();
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id_empresa;
      this.id_examen = param.id_examen;
      this.apiAlid.ExamenId(this.id_examen)
      .subscribe((res:any)=>{
        this.examen = res.examen;
        this.idExamen = this.examen.id_examen;
        this.numpreg = this.examen.numero_preguntas;

        this.apiAlid.list_preguntas(this.id_examen)
      .subscribe((res:any)=>{
        this.preguntas = res.preguntas;

        if(res.sucess == false){
          for (var i=1; i<=this.numpreg; i++){
            this.arrnumpreg.push(i);
          }
        }

      });

      });

    });

   }

  GuardarPreguntas(f){
    const payload = {
      user: this.id_empresa,
      data: f.value,
      idexamen:this.idExamen
    };

    this.apiAlid.guardarPreguntas(payload)
    .subscribe((res:any)=>{

     this.sucess = true;
     this.mensaje = res.mensaje;
     setTimeout(() => {
      this.sucess = false;
      if(res.sucess == true){
        this.router.navigate( ['empresa/Examenes/',this.id_empresa] );
      }
    }, 500);

    });
  }

  eliminar_preg(id_preg:number,id_exa:number){

    Swal.fire({
      title: 'Desea eliminar pregunta?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this.apiAlid.eliminar_preg(id_preg,id_exa)
    .subscribe((res:any)=>{
      this.preguntas = res.preguntas;
      this.mensaje = res.mensaje;
      if(res.sucess == true){
        Swal.fire(res.mensaje, '', 'success')
      }
     });
      }
    })



  }

  addPregunta(f){
    const payload = {
      user: this.id_empresa,
      data: f.value,
      idexamen:this.idExamen
    };

    this.apiAlid.add_preg(payload)
    .subscribe((res:any)=>{
   if(res.sucess == true){
    this.crrmd = true;
   }else{
    this.mensaje = res.mensaje
    this.validalm = false;
    setTimeout(() => {

      this.validalm = true;
    }, 2500);

   }

     });

  }

  crrmod(){
    this.router.navigate( ['empresa/Examenes/',this.id_empresa] );
  }
}
