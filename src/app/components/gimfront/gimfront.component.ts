import { Component, OnInit } from '@angular/core';
import { Gimnasio, RespGimnasios, User, Instructor,Paises,RespuestaPaises } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { InstructoresComponent } from 'src/app/admin/instructores/instructores.component';

declare var $: any;
frmRegister: UntypedFormGroup;

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
  frmRegister: UntypedFormGroup;
  imgCountry: String;
  paisesList: Paises[] = [];
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
    private apiAuth: AuthService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });


    this.InitForm();
    
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

  InitForm(){
    this.frmRegister = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
      gimnasio: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required, Validators.minLength(5)]],
    }, {validator: this.checkPasswords});

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

  cambioPais() {
   
    this.banderaPais(this.frmRegister.get('pais').value);
  }


  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

   checkPasswords(group: any) {
    const pass = group.get('contrasena').value;
    const confirmPass = group.get('confirmPass').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  register(){
    this.api.register(this.frmRegister.value,7)
    .subscribe((res: any) => {
      this.frmRegister.reset();
      this.api.mensajeUser = res.mensaje;
      this.api.mostrarMsj = true;

    });
  }

}
