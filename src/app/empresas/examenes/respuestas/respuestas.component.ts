import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Examen,Pregunta,Respuesta} from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
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
  respuestas: Respuesta[] = [];

  constructor(private fb: UntypedFormBuilder,
    private apiAlid: AliadosService,
    private authApi:AuthService,
    private router:Router,
    private acRouter: ActivatedRoute) { }

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
        });

        this.apiAlid.list_respuestas(this.id_examen)
        .subscribe((res:any)=>{
          this.respuestas = res.respuestas;
          console.log(this.respuestas);

        });

        });
      });

     }



     guardarResp(r){

      const payload = {
        user: this.id_empresa,
        data: r.value,
        idexamen:this.idExamen
      };
      console.log(payload);

      this.apiAlid.guardarRespuestas(payload)
      .subscribe((res:any)=>{

       this.sucess = true;
       this.mensaje = res.mensaje;
       setTimeout(() => {
        this.sucess = false;
        if(res.sucess == true){
          this.router.navigate( ['empresa/Examenes/',this.id_empresa] );
        }
      }, 5000);

      });


     }
}
