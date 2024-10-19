import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trabajo, User } from 'src/app/interfaces/interfaces';
import { AliadosService } from '../../services/aliados.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  trabajos: Trabajo[] = [];
  user: User = {};
  id_empresa:number;
  tipo_doc:number;
  tipo_edit:number;
  pathImg = environment.pathImgs;
  perfilUsu :String;


  constructor(private router: Router,
    private apiAlid: AliadosService,
    private authservice: AuthService,
    private _sanitizer: DomSanitizer,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {
      this.user = this.authservice.getUser();
      this.perfilUsu = this.user.usu_perfil;
      if( this.perfilUsu=='5'){
        this.id_empresa = this.user.usu_id;
      }else{
        this.id_empresa = param.id_empresa;
      }

      this.tipo_doc = param.tipo_doc;
      this.tipo_edit = param.tipo_doc;
      this.apiAlid.List_trabajos(this.id_empresa,this.tipo_doc)
        .subscribe((res: any) => {
          if (res.success == true) {
            this.trabajos = res.trabajos

          }else{
            Swal.fire(res.mensaje)
          }
        });
    });
  }

  nuevoTrabajo(id_empresa,id_trabajo,tipo_edit,tipo_doc){
    this.router.navigate(['empresa/Trabajo/'+id_empresa+'/'+id_trabajo+'/'+tipo_edit+'/'+tipo_doc]);
  }

  eliminarTrabajo(id_trabajo){
    this.apiAlid.eliminarTrabajo(id_trabajo,this.id_empresa)
    .subscribe((res:any)=>{
      this.trabajos = res.trabajos;
      Swal.fire('Trabajo eliminado exitosamente')
    })

  }

  resultados(id_trabajo){
    this.router.navigate(['empresa/Trabajo/respuesta/'+id_trabajo]);

  }

}
