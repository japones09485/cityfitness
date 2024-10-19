import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AliadosService } from '../../../services/aliados.service';
import { AuthService } from '../../../services/auth.service';
import { Resultados } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  id_examen :number;
  mensaje : string;
  resultados: Resultados[] = [];

  constructor(  private apiAlid: AliadosService,
    private authApi:AuthService,
    private router:Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {


    this.acRouter.params.subscribe(param => {
      this.id_examen = param.id_examen;

      this.apiAlid.resultadosExamen(this.id_examen)
        .subscribe((res: any) => {
          if (res.sucess == true) {
            this.resultados = res.resultados;
          }
        });
    });

  }

  verResultado(id_pres:number){
    this.router.navigate(['empresa/Detalle/', id_pres]);
  }

  EliminarPresentacion(id_pres:number,id_examen:number){
    Swal.fire({
      title: 'Desea eliminar estos resultados?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this.apiAlid.EliminarPresentacion(id_pres,id_examen)
    .subscribe((res:any)=>{
      this.mensaje = res.mensaje;
      if(res.sucess == true){
        this.resultados = res.resultados;
        Swal.fire(res.mensaje, '', 'success')
      }
     });
      }
    })
  }

}
