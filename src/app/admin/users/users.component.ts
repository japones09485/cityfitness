import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { AliadosService } from '../../services/aliados.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Usuario, RespUsuario, AlumnosInscritos, Paises,RespuestaPaises } from '../../interfaces/interfaces';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  cantPaginas: number;
  failResult: boolean;
  ImgLogo: boolean;
  listAlumnos: boolean;
  perfilF: number;
  cursoF: number;
  pathImg = environment.pathImgs;
  frmClasCreator: UntypedFormGroup;
  alumnosInscritos: AlumnosInscritos[] = [];
  cantAlumnos: number;
  validAlum: boolean;
  mensaje: number;
  titleForm: String;
  cantidadPaginas = 0;
  cursoins: number;
  empws : number;
  user:any;
  nomsocio:string;
  socio:any
  paises: Paises[] = [];
  nombrePais:String;
  validInst = false;
  mailY:string;
  validCrear = true;
  
  filts = {
    nameSearch: '',
    apellisearch: ''
  };
  constructor(private apiRest: ApiRestService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private apiAuth:AuthService,
    private apiAlid: AliadosService,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.failResult = false;
    this.listAlumnos = false;
    this.validAlum = false;
    this.user = this.apiAuth.getUser();

    this.acRouter.params.subscribe(param => {



      this.perfilF = param.perfil;
      this.mailY = param.EmailAliado;

      if(this.mailY){
        
        this.apiRest.getUsuarioEmail(this.mailY,this.perfilF)
        .subscribe((data: any) => {
          this.incializarForm();
          if(data.success == true){
            this.usuarios = data.lista;
            this.cantidadPaginas = data.cant_pag;
            this.validCrear = false;
          }
         
        });

      }else{

        if (this.perfilF == 5) {
          this.cursoins = param.curso;
  
          this.apiRest.getUsuarios(param.perfil,this.cursoins)
          .subscribe((data: any) => {
            this.incializarForm();
            this.usuarios = data.lista;
            this.cantidadPaginas = data.cant_pag;
          });
  
        }else if(this.perfilF == 6){
          this.empws = param.empws;
          this.apiRest.traerIdSocio(this.user.usu_fk_socio)
          .subscribe((res:any)=>{
            this.socio = res.socio
            this.nomsocio = this.socio.soc_nombre;
          });
          this.apiRest.getUsuarios(param.perfil,0,1,this.empws)
          .subscribe((data: any) => {
            this.incializarForm();
            this.usuarios = data.lista;
            this.cantidadPaginas = data.cant_pag;
          });
  
        } else {
  
            this.apiRest.getUsuarios(param.perfil)
            .subscribe((data: any) => {
              this.incializarForm();
              this.usuarios = data.lista;
              this.cantPaginas = data.cant_pag;
            });
         
        }
  
      }

    
      this.apiRest.getPaises()
      .subscribe((res:RespuestaPaises)=>{
        this.paises = res.lista
      });

    });



  }

  incializarForm() {
    this.frmClasCreator = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]

    });
  }

  activarfechas(id: number) {

    $('#fechaInicio' + id).datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fecha_inicio: e.target.value
        });
      }
    });

    $('#fechaFin' + id).datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fecha_fin: e.target.value
        });
      }
    });


  }

  traerAlumnos(id: number) {
    this.apiAlid.listadoalumnos(this.frmClasCreator.value, id)
      .subscribe((res: any) => {
        this.listAlumnos = res.sucess;
        console.log(res.alumnos);

        if (this.listAlumnos == true) {
          this.alumnosInscritos = res.alumnos;
          this.cantAlumnos = res.cantidad;

        } else {
          this.validAlum = true;
          this.mensaje = res.mensaje;
        }
      });
  }

  buscarUsuario() {
    this.apiRest.buscarUsuarios(this.filts)
      .subscribe((res: any) => {
        if (res.ok == true) {
          this.usuarios = res.lista;
        } else {
          this.failResult = true;
          setTimeout(() => {
            this.failResult = false
          }, 3000);
        }
      });

  }

  editUsuario(id,perfil?:number) {

  if(this.perfilF == 6){
    this.router.navigate(['admin/editUser', id,perfil,this.empws]);
  }else{
    if(this.mailY){
     
      this.router.navigate(['admin/editUsermailY',id,perfil,this.mailY]);
    }else{
      this.router.navigate(['admin/editUser', id]);
    }

  }

  }

  nuevoUsuario(perfil:number,curso?:number,empresaws?:number) {
    
      
    if(this.mailY){
      
      this.router.navigate(['admin/userMail', perfil, this.mailY]);
  
    }else{

        this.router.navigate(['admin/user', perfil,curso,empresaws]);
    
    }
    

  }

  eliminarUsuario(usuario:number,curso:number,perfil:number){
    
   
    Swal.fire({
      title: 'Mensaje de usuario',
      text:  'Desea eliminar este clase?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.apiRest.eliminarUsuario(usuario,curso,perfil)
        .subscribe((res:any)=>{
          this.usuarios = res.lista;
        })

      }
    })

  }


  sigPag(pagina: number) {

    this.apiRest.getUsuarios(this.perfilF,1,pagina)
      .subscribe((data: any) => {
        this.usuarios = data.lista;
      });

  }

  banderaInstructor(bandera: string) {
    const country = this.apiRest.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

  adminempresa(usuario: number) {
    sessionStorage.setItem('emp_actual', JSON.stringify(usuario));
    this.router.navigate(['adminempresa', usuario]);
  }

  pags(): any[] {
    return Array(this.cantidadPaginas);
  }

  getOut(){
    this.apiAuth.logOut();
    this.user = null;
    this.router.navigateByUrl('/websociosinicio');
  }

  validUsu(usuId:number, newEstado:number,curso:number){

    Swal.fire({
      title: "Desea procesar validacion de usuario?",
      showCancelButton: true,
      confirmButtonText: "Si",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

      this.apiRest.validUsu(usuId,newEstado,curso,this.perfilF)
      .subscribe((res:any)=>{
        this.usuarios = res.lista;
        Swal.fire(res.mensaje, "", "success");
      });
      }
      
    });


  }


}
