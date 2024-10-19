import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Examen, User } from 'src/app/interfaces/interfaces';
import { AliadosService } from '../../services/aliados.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  examenes: Examen[] = [];
  user: User = {};
  mensaje = 'Desea eliminar este examen?';
  sucessvideo: boolean;
  flagSave = false;
  eliminado = true;
  id_empresa:number;
  valid:boolean;
  alertv:string;
  perfilUsu :String;

  constructor(private router: Router,
    private apiAlid: AliadosService,
    private authservice: AuthService,
    private _sanitizer: DomSanitizer,
    private acRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sucessvideo = false;
    this.user = this.authservice.getUser();
    this.perfilUsu = this.user.usu_perfil;
    this.valid = true;

    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
      this.apiAlid.listarExamenes(param.id,1)
        .subscribe((res: any) => {
          if (res.sucess == true) {
            this.examenes = res.data;
          }
        });
    });

  }

  nuevoExamen(id_empresa:number,id_examen:number) {
    this.router.navigate(['empresa/Examen/'+id_empresa+'/'+id_examen]);
  }

  PreguntasExamen(id_empresa:number,id_examen:number){
    this.router.navigate(['empresa/Preguntas/'+id_empresa+'/'+id_examen]);
  }

  RespuestasExamen(id_empresa:number,id_examen:number){
    this.router.navigate(['empresa/Respuestas/'+id_empresa+'/'+id_examen]);
  }

  estadoExamen(id_examen:number,estado:number,aliado:number){
    this.apiAlid.estadoExamen(id_examen,estado,aliado)
      .subscribe((res: any) => {
        this.examenes = res.examenes;
        this.alertv='Para activar el examen debe configurar todas las preguntas y respuestas.';
        if(res.sucess == false){
          this.valid = false;
          setTimeout(() => {

            this.valid = true;
          }, 2500);
        }


      });
  }


  getURL(url) {

    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
}

eliminarExamen(id_examen: number, id_empresa:number) {

    this.apiAlid.eliminarExamen(id_examen,id_empresa)
      .subscribe((res: any) => {
          this.alertv = res.mensaje;
          this.examenes = res.examenes;
          this.valid = false;
          setTimeout(() => {

            this.valid = true;
          }, 2500);
          this.router.navigate(['empresa/Examenes/'+this.id_empresa]);

      });
  }

ResultadosExamen(id_examen: number){

  this.router.navigate(['empresa/Resultados/'+id_examen]);
}

alumExamenRecupera(id_examen: number){
  this.router.navigate(['empresa/alum_recuperacion/'+id_examen]);
}
}
