import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Paises, Usuario } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  frmUsuario: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave: boolean;
  flagGuardado: boolean;
  mensaje: string;
  nameImg: string;
  pathIm = environment.pathImgs;
  validAlid: number;
  perfilF: number;
  cursoF: number;
  nombrePais:String;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  pathImg = environment.pathImgs;
  empresaws:number;
  socio:any;
  nomsocio:string;
  user:any;
  socioempres:number;
  mailY: string ;

  constructor(public apiRest: ApiRestService,
    private fb: UntypedFormBuilder,
    private acRouter: ActivatedRoute,
    private apiAuth:AuthService,
     private router: Router,) { }

  ngOnInit(): void {
    this.initForm();
    this.user = this.apiAuth.getUser();
    this.acRouter.params.subscribe(param => {


      if(param.mailY){
        this.mailY = param.mailY;
      }
  
      
    this.perfilF = param.perfil;
    this.cursoF = param.curso;
    this.empresaws = param.empresaws;
    this.nameImg = 'Cargue una imagen';
    this.flagSave = false;
    this.flagGuardado = false;
   
   
    });

    this.apiRest.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    if(this.perfilF == 6){


      this.apiRest.traerIdSocio(this.user.usu_fk_socio)
        .subscribe((res:any)=>{
          this.socio = res.socio
          this.nomsocio = this.socio.soc_nombre;
        });
    }


    if(this.perfilF == 4 && this.mailY){
     this.initFormmailY(this.mailY);
    }

    this.apiRest.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

  }

  cambioPais() {
    this.banderaPais(this.frmUsuario.get('pais').value);
  }

  getOut(){
    this.apiAuth.logOut();
    this.user = null;
    this.router.navigateByUrl('/websociosinicio');
  }



  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }
  initForm() {

    this.frmUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      descripcion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      epayco: '',
      link_mes: '',
      link_trimestre: '',
      link_semestre: '',
      apikey: '',
      merchantid: '',
      pais: ['', Validators.required],
      perfil: ['', Validators.required],
      logo: ['', Validators.required],
      contras: ['', Validators.required],
      vericontras: ['', Validators.required],
      estado: ['', Validators.required],
      videoB : '',
      cursof: this.cursoF,
      empresaws: this.empresaws
    }, { validator: this.checkPasswords });
  }

  initFormmailY(mailY:string) {

    this.frmUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      descripcion: ['', Validators.required],
      email: [mailY, [Validators.required, Validators.email]], // Valor predeterminado para el campo de email
      telefono: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      epayco: '',
      link_mes: '',
      link_trimestre: '',
      link_semestre: '',
      apikey: '',
      merchantid: '',
      pais: ['', Validators.required],
      perfil: ['', Validators.required],
      logo: ['', Validators.required],
      contras: ['', Validators.required],
      vericontras: ['', Validators.required],
      estado: ['', Validators.required],
      videoB : '',
      cursof: this.cursoF,
      empresaws: this.empresaws
    }, { validator: this.checkPasswords });
  }

  crearUsuario(perfilF:number) {

    this.flagSave = true;
    const aux =  this.cursoF;

    this.frmGuardar.append('curso', JSON.stringify(this.cursoF));
    this.frmGuardar.append('data', JSON.stringify(this.frmUsuario.value));

    this.apiRest.guardarUsuario(this.frmGuardar)
    .subscribe((data:any)=>{
      if(data.ok == true){

        this.nameImg = 'Cargue una imagen';
        this.mensaje = data.mensaje;
        this.frmUsuario.reset();
        this.apiRest.mensajeUser = 'Creado correctamente';
        this.apiRest.mostrarMsj = true;
        if(perfilF == 4 && this.mailY){
        setTimeout(() => {
          //solo ve el de el
              this.router.navigate(['admin/users/4/1', this.mailY]);
          }, 2000);
        }
        
        this.ngOnInit();
      }else{
        this.mensaje = data.mensaje;
        this.flagGuardado = true;
        setTimeout(() => {
          this.flagGuardado = false;
      }, 5000);
      }

    });
  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;

    if (imgs.files.length > 0) {
      this.nameImg = imgs.files[0].name;
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);

    }
  }

  checkPasswords(group: UntypedFormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('contras').value;
    const confirmPass = group.get('vericontras').value;
    return pass === confirmPass ? null : { notSame: true };
  }

}
