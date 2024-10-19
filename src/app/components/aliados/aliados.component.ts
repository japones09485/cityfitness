import { Component, OnInit } from '@angular/core';
import {User,Paises,RespuestaPaises} from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AliadosService } from '../../services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {
  aliados : User[] = [];
  pathImg = environment.pathImgs;
  alumnoLog: User = {};
  paginas = 0;
  paises: Paises[] = [];
  nombrePais:String;
  filts = {
    nameSearch: '',
    paisSearch: '',
  };
  constructor(private AlidService:AliadosService, 
              public api: ApiRestService,
              private apiauth: AuthService ) { }

  ngOnInit(): void {
    this.alumnoLog = this.apiauth.getUser();
    this.AlidService.listarActivos()
        .subscribe((res:any)=>{
         this.aliados = res.lista;
         this.paginas = res.cant_pag;      
        });
    this.api.getPaises()
        .subscribe((res:RespuestaPaises)=>{
          this.paises = res.lista
        });
  }

  sigPag(pag: number){
    this.AlidService.listarActivos(pag)
      .subscribe((res: any) => { this.aliados = res.lista; this.paginas = res.cant_pag; });
  }

  buscarInstructor(){
    this.AlidService.searchAliado(this.filts)
    .subscribe((res: any) => { this.aliados = res.lista; });
  }

  banderaInstructor(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

 
}
