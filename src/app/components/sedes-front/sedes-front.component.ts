import { Component, OnInit } from '@angular/core';
import {User,Paises,RespuestaPaises, Sedes} from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AliadosService } from '../../services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-sedes-front',
  templateUrl: './sedes-front.component.html',
  styleUrls: ['./sedes-front.component.css']
})
export class SedesFrontComponent implements OnInit {

  sedes : Sedes[] = [];
  pathImg = environment.pathImgs;
  paises: Paises[] = [];
  nombrePais:String;
  constructor(private AlidService:AliadosService,
    public api: ApiRestService,
    private apiauth: AuthService) { }

  ngOnInit(): void {

    this.api.getSedesFront()
    .subscribe((res:any)=>{
      this.sedes = res.lista;

    });
  }

}
