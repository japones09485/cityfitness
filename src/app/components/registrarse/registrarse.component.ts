import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiRestService } from '../../services/api-rest.service';
import { Router } from '@angular/router';
import { Paises,RespuestaPaises } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  $: any;
  frmRegister: UntypedFormGroup;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathImg = environment.pathImgs;
  empSocio: number;
  idAliado:number;
  fondocity:string;


  constructor(
    private fb: UntypedFormBuilder,
    private apiAuth: AuthService,
    public api: ApiRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empSocio =JSON.parse( sessionStorage.getItem('id_empresasSoc'));
    this.idAliado =JSON.parse( sessionStorage.getItem('idAliado'));

    if(this.empSocio){
      this.fondocity = '../../.././assets/img/registerSocios.jpg';
    }else{
      this.fondocity = '../../.././assets/img/fondo-transp.png';
    }

    this.frmRegister = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required, Validators.minLength(5)]],
    }, {validator: this.checkPasswords});

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

  }

  register(){
   
    this.api.register(this.frmRegister.value)
      .subscribe((res: any) => {
        this.frmRegister.reset();
        this.api.mensajeUser = res.mensaje;
        this.api.mostrarMsj = true;

      });
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


}
