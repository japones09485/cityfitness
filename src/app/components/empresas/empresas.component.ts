import { Component, OnInit } from '@angular/core';
import { Cliente, RespuestaClientes, Paises,RespuestaPaises } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  listEmpresas: Cliente[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathImg = environment.pathImgs;
  constructor(private api: ApiRestService) { }

  ngOnInit(): void {
    this.api.getAllEmpresas()
      .subscribe((res: RespuestaClientes) => {
        this.listEmpresas = res.lista; 
      });   

      this.api.getPaises()
      .subscribe((res:RespuestaPaises)=>{
        this.paises = res.lista
      });
      
  }

  banderaPais(bandera: string) {
   let infopais = this.paises[bandera].flag;
   this.nombrePais = this.paises[bandera].nombre;
   const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
    return flagPais;
  }

}
