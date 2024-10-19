import { Component, OnInit } from '@angular/core';
import { Socios,Paises,RespuestaPaises } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {
  listado: Socios[] = [];
  pathIm = environment.pathImgs;
  paises: Paises[] = [];
  nombrePais:String;

  constructor(public api: ApiRestService,
              private router: Router) { }

  ngOnInit(): void {
  this.api.getSocios()
    .subscribe((res:any)=>{
      this.listado =  res.lista;

    })

    this.api.getPaises()
    .subscribe((res:RespuestaPaises)=>{
      this.paises = res.lista
    });

  }

  Nuevosocio(){
    this.router.navigate(['admin/create_socios']);
  }

  banderaGimnasio(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
     return flagPais;
   }

}
