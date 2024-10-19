import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiRestService} from '../../../services/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Usuario , RespUsuario, Paises } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  usuario:Usuario;
  frmEditUsuario: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave:boolean;
  flagGuardado:boolean;
  mensaje:string;
  nameImg:string;
  pathIm = environment.pathImgs;
  imgLogo: string;
  validAlid:number;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathImg = environment.pathImgs;
  perfilF:number;
  empresaws: number;
  socio:any;
  nomsocio:string;
  user:any;
  mailY:false;
  mailUsuario:string;
  

  constructor(public apiRest:ApiRestService,
              private roter:Router,
              private Activated: ActivatedRoute,
              private fb: UntypedFormBuilder,
              private apiAuth:AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();

    this.flagGuardado = false;
    this.nameImg = 'Selecciones una foto';
    this.Activated.params.subscribe(param =>{

      if(param.mailY){
        this.mailY = param.mailY 

      }
      this.apiRest.traerIdUsuario(param.id)
      .subscribe(resp =>{
       this.usuario = resp['usuario'];
       this.validAlid = this.usuario.usu_perfil;
       this.mailUsuario = this.usuario.usu_email;
       
       this.imgLogo = this.pathIm + this.usuario.usu_logo;
       this.initForm();
       this.banderaPais(this.usuario.usu_pais);
       if(param.perfil==6){
         this.perfilF = param.perfil;
         this.empresaws = param.empresaws;
         this.apiRest.traerIdSocio(this.user.usu_fk_socio)
         .subscribe((res:any)=>{
           this.socio = res.socio
           this.nomsocio = this.socio.soc_nombre;
         });
       }else if(param.perfil==4 && this.mailY){
        this.perfilF = param.perfil;
        this.mailUsuario = this.mailY;
       }
      })
     });


     this.Form();

     this.apiRest.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.apiRest.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

  }



  initForm(){
    this.frmEditUsuario = this.fb.group({
      nombre: [this.usuario.usu_nombres, Validators.required],
      apellidos: [this.usuario.usu_apellidos, Validators.required],
      descripcion: [this.usuario.usu_descrip_profesional, Validators.required],
      email: [this.usuario.usu_email, [Validators.required, Validators.email]],
      telefono : [this.usuario.usu_telefono, Validators.required],
      facebook : [this.usuario.usu_facebook, Validators.required],
      instagram : [this.usuario.usu_instagram, Validators.required],
      epayco: [this.usuario.usu_epayco],
      apikey: [this.usuario.usu_apikey],
      merchantid: [this.usuario.usu_merchantid],
      link_mes :[this.usuario.link_pago_mes],
      link_trimestre : [this.usuario.link_pago_trimestre],
      link_semestre : [this.usuario.link_pago_semestre],
      pais: [this.usuario.usu_pais, Validators.required],
      perfil: [this.usuario.usu_perfil, Validators.required],
      estado: [this.usuario.usu_estado, Validators.required],
      contras: [this.usuario.usu_textoclaro, Validators.required],
      vericontras: [this.usuario.usu_textoclaro, Validators.required],
      videoB :[this.usuario.usu_videoB]
    });
  }

  Form(){
    this.frmEditUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      descripcion:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono : ['', Validators.required],
      facebook : ['', Validators.required],
      instagram : ['', Validators.required],
      epayco: ['', Validators.required],
      link_mes :['', Validators.required],
      link_trimestre : ['', Validators.required],
      link_semestre : ['', Validators.required],
      pais: ['', Validators.required],
      estado : ['', Validators.required],
      perfil: [''],
      contras: ['', Validators.required],
      vericontras: ['', Validators.required],
      videoB :[''],
    });
  }



  editUsuario(){
    this.flagSave = true;
    const payload = {
      id_edit: this.usuario.usu_id,
      data: this.frmEditUsuario.value
    };

   
  
    
    this.frmGuardar.append('data', JSON.stringify(payload));
    this.apiRest.editarusuario(this.frmGuardar)
                .subscribe((res:any)=>{
                  this.imgLogo = this.pathIm +res.data.usu_logo;
                  this.apiRest.mensajeUser = 'Editado correctamente';
                  this.apiRest.mostrarMsj = true;
                  if(this.perfilF == 4 && this.mailY){

                    setTimeout(() => {
                      //solo ve el de el
                          this.router.navigate(['admin/users/4/1', this.mailY]);
                      }, 2000);
                    }

                })


  }

  cambioPais() {
    this.banderaPais(this.frmEditUsuario.get('pais').value);
  }



  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

  checkPasswords(group: UntypedFormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('contras').value;
    const confirmPass = group.get('vericontras').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this .nameImg = imgs.files[0].name;
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);

    }
  }

}
