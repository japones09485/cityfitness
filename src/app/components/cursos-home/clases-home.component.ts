import { Component, OnInit, Input } from '@angular/core';
import { Curso, Clase, RespClases,Usuario } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clases-home',
  templateUrl: './clases-home.component.html',
  styleUrls: ['./clases-home.component.css']
})
export class ClasesHomeComponent implements OnInit {

  @Input() curso: Curso;
  listaClases: Clase[] = [];
  pathImg = environment.pathImgs;
  apiKey = environment.pKeyEpayco;
  usuarios: Usuario[] = [];
  constructor(public api: ApiRestService) {
    moment.locale('es');
  }

  ngOnInit(): void {

    this.api.getUsuarios(5,this.curso.cur_id,1)
    .subscribe((res:any)=>{
      if(res.ok == true){
        this.usuarios = res.lista
      }
    });
  }

}
