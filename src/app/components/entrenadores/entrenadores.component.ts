import { Component, OnInit } from '@angular/core';
import { Curso, Instructor, User, Gimnasio, RespuestaPaises, Paises } from 'src/app/interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';


declare var $: any;

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent implements OnInit {

  $: any;
  instructores: Instructor[] = [];
  pathImg = environment.pathImgs;
  instructorhojadevida: Instructor;

  hojadevida = false;
  user: User;
  paginas = 0;
  GimView: Gimnasio[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  filts = {
    nameSearch: '',
    apellisearch: ''
  };
  constructor(
    public sanitizer: DomSanitizer,
    public api: ApiRestService,
    private apiAuth: AuthService,
  ) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $('.mobile-menu').slicknav({
          prependTo: '#mobile-menu-wrap',
          allowParentLinks: false
      });
    });
    this.user = this.apiAuth.getUser();
       
    this.api.getPaises()
    .subscribe((res:RespuestaPaises)=>{
      this.paises = res.lista
    });
    
    this.api.getInstructoresFront()
      .subscribe((res: any) => { 
        this.instructores = res.lista; 
    
        this.paginas = res.cant_pag; });
  }


  buscarInstructor() {
    
    if(this.filts.nameSearch == '' ){
      this.ngOnInit();
    }else{
      this.api.searchInstructor(this.filts)
      .subscribe((res: any) => { this.instructores = res.lista; });
    }
   
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
   

  verhojadevida(instructor: Instructor) {
    this.instructorhojadevida = instructor;
    this.hojadevida = true;
  }

  like(instructor: Instructor){
    this.user = this.apiAuth.getUser();
    instructor.ins_likes++;
    instructor.verlike = true;
    const payload = {
      instructor: instructor.ins_id,
      usuario: this.user.usu_id
    };

    this.api.like(payload, 1)
      .subscribe(res => {
        console.log(res);
      });
  }

  disLike(instructor: Instructor){
    this.user = this.apiAuth.getUser();
    instructor.ins_likes--;
    instructor.verlike = false;
    const payload = {
      instructor: instructor.ins_id,
      usuario: this.user.usu_id
    };

    this.api.like(payload, 1)
      .subscribe(res => {
        console.log(res);
      });
  }

  sigPag(pag: number){
    this.api.getInstructoresFront(pag)
      .subscribe((res: any) => { this.instructores = res.lista; this.paginas = res.cant_pag; });
  }

  loadGimnasios(gimnasios: Gimnasio[]){
    this.GimView = gimnasios;
  }

  FanPage(instr){
    console.log(instr);
    
  }

}
