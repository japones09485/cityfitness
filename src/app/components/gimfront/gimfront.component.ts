import { Component, OnInit } from '@angular/core';
import { Gimnasio, RespGimnasios, User, Instructor,Paises,RespuestaPaises } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { InstructoresComponent } from 'src/app/admin/instructores/instructores.component';

declare var $: any;

@Component({
  selector: 'app-gimfront',
  templateUrl: './gimfront.component.html',
  styleUrls: ['./gimfront.component.css']
})
export class GimfrontComponent implements OnInit {


  $: any;
  list: Gimnasio[] = [];
  pathImg = environment.pathImgs;
  user: User;
  InsView: Instructor[] = [];
  paginas = 0;
  namegim: string;
  descrip: string;
  paises: Paises[] = [];
  nombrePais:String;

  filts = {
    nameSearch: '',
    paisSearch: '',
    perfilSearch: ''
  };

  constructor(
    public api: ApiRestService,
    public sanitizer: DomSanitizer,
    private apiAuth: AuthService
  ) { }

  ngOnInit(): void {
    $(document).ready(() => {
      $('.mobile-menu').slicknav({
          prependTo: '#mobile-menu-wrap',
          allowParentLinks: false
      });
    });
    this.user = this.apiAuth.getUser();
    this.listGimnasios();

    
    this.api.getPaises()
    .subscribe((res:RespuestaPaises)=>{
      this.paises = res.lista
    });

  }

  listGimnasios(){
    this.api.getAllGimnasios()
      .subscribe( (res: RespGimnasios) => {
        this.list = res.lista;
        this.paginas = res.cant_pag;
      });
  }

  banderaGimnasio(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

  like(gim: Gimnasio){
    this.user = this.apiAuth.getUser();
    gim.gim_likes++;
    gim.verlike = true;

    const payload = {
      gimnasio: gim.gim_id,
      usuario: this.user.usu_id
    };

    this.api.like(payload, 2)
      .subscribe(res => {});
  }

  disLike(gimnasio: Gimnasio){
    this.user = this.apiAuth.getUser();
    gimnasio.gim_likes--;
    gimnasio.verlike = false;
    const payload = {
      gimnasio: gimnasio.gim_id,
      usuario: this.user.usu_id
    };

    this.api.like(payload, 2)
      .subscribe(res => {
        console.log(res);
      });
  }

  sigPag(pag: number){
    this.api.getAllGimnasios(pag)
      .subscribe((res: any) => { this.list = res.lista; this.paginas = res.cant_pag; });
  }

  loadIntructores(instructores: Instructor[]){
    this.InsView = instructores;
  }

  buscarGimnasio() {
    this.api.searchGimnasio(this.filts)
      .subscribe((res: any) => { this.list = res.lista; });
  }

  infogim(name,desc){
    this.namegim = name;
    this.descrip = desc;
  }
}
