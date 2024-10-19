import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajoRespuesta, User } from 'src/app/interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent implements OnInit {
  respuestas: TrabajoRespuesta[] = [];
  pathImg = environment.pathImgs;

  constructor(private router: Router,
    private apiAlid: AliadosService,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {


    this.acRouter.params.subscribe(param => {
      this.apiAlid.listarRespuestasTrabajos(param.id_trabajo)
      .subscribe((res:any)=>{
        if(res.success == true){
          this.respuestas = res.respuestas
          console.log(this.respuestas);

        }else{
          Swal.fire('No se encuentran registros disponibles.')
        }

        console.log(this.respuestas);


       })
    });


  }

}
