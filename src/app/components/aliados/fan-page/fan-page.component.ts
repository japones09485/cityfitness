import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AliadosService } from '../../../services/aliados.service';
import { User, ClaAliad,Examen,Trabajo } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router';
import { timeout, timeoutWith } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fan-page',
  templateUrl: './fan-page.component.html',
  styleUrls: ['./fan-page.component.css']
})
export class FanPageComponent implements OnInit {
  aliado: User = {};
  pathIm = environment.pathImgs;
  clases: ClaAliad[]=[];
  trabajos: Trabajo[]=[];
  LogUser: boolean;
  idLog: number;
  UserLog: User;
  alumno: any;
  activationplan: boolean;
  mensaje: string;
  fechafin: string;
  empSocio:number;
  examenes: Examen[] = [];
  private _sanitizer: DomSanitizer


  constructor(private acRouter: ActivatedRoute,
    private api: AliadosService,
    private apiAuth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.empSocio =JSON.parse( sessionStorage.getItem('id_empresasSoc'));
    this.alumno =JSON.parse( sessionStorage.getItem('user'));

    
    this.acRouter.params.subscribe(param => {
      sessionStorage.setItem('idAliado', JSON.stringify(param.id));
      this.UserLog = this.apiAuth.getUser();
      
      if (!this.UserLog) {
        this.activationplan = false
      } else {
        this.idLog = this.UserLog.usu_id;
        this.api.VerifiAlumno(param.id, this.idLog)
          .subscribe((data: any) => {
            if (data.sucess == true) {
              this.fechafin = data.fecha_fin;
              this.activationplan = true;
            } else {
              Swal.fire('Su plan ha expirado por favor ponerse en contacto con su instructor');
              this.activationplan = false
            }
          });
      }

      this.api.TraerxId(param.id)
        .subscribe((data: any) => {
          this.aliado = data.usuario;
        });
      this.api.ClasesAlidFront(param.id)
        .subscribe((data: any) => {
          this.clases = data.data;
        });
        //traer documentos

        this.api.List_trabajosAct(param.id,0)
        .subscribe((res:any)=>{
          this.trabajos = res.trabajos

        });
        this.api.listarExamenesAc(param.id,1,this.alumno.usu_id)
        .subscribe((res:any)=>{
          this.examenes = res.data;
        });

    });


  }

  IngresarClase(clase:ClaAliad){

    if (!this.UserLog) {
      this.mensaje = 'Para acceder a las clases en vivo debe registrarse en nuestra pagina.';
    }else{
      if(this.activationplan ==true){
        this.router.navigate( ['/conferencia',clase.claA_id] );
      }else{
        this.mensaje = 'Para obtener todo el contenido en vivo adquiere alguno de nuestros planes.';
       setTimeout(() => {
        this.mensaje = '';
       }, 5000);
      }
    }

  }


  getURL(url) {

    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  videoB(id:number){
    this.router.navigate(['videoB/'+id]);
  }

  Presentarex(idexamen:number,id_empresa:number){
    this.router.navigate(['presentarex/'+idexamen+'/'+id_empresa]);
  }

  cargarDocumento(id_trabajo:number){
    this.router.navigate(['aliados/CargaRes/'+id_trabajo]);
  }

}
