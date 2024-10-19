import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, Trabajo} from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {

  id_empresa : number;
  id_trabajo : number;
  frmClasCreator : UntypedFormGroup;
  frmGuardar = new FormData();
  frmAlumCreator : UntypedFormGroup;
  alumGuardar = new FormData();
  trabajo : Trabajo;
  mensaje : string;
  sucess :boolean;
  user : Usuario;
  estadoex : boolean;
  profesor : number;
  tipo_prog : number;
  programa : number;
  edit : number;
  tipo_doc : number;

  constructor(private fb: UntypedFormBuilder,
    private authApi:AuthService,
    private apiAlid: AliadosService,
    private router:Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {

      this.id_trabajo = param.id_trabajo;
      this.id_empresa = param.id_empresa;
      this.edit = param.tipo_edit;
      this.tipo_doc = param.tipo_doc;

      this.initForm();
      if(this.edit > 0){

        this.apiAlid.TrabajoId(this.id_trabajo)
        .subscribe((res:any)=>{
          this.trabajo = res.trabajo;
          this.chargeForm();

        });

      }

    });
  }

  agregarArchivo(event: any, numImg: number) {

    const imgs: any = event.target;

    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }


  }

  fechaini(event: any){
    this.frmClasCreator.patchValue({
      fechaini: event.target.value
    });

  }

  fechafin(event: any){
    this.frmClasCreator.patchValue({
      fechafin: event.target.value
    });
  }



  initForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],
      fechaini: ['', Validators.required],
      fechafin: ['', Validators.required],
    });
  }

  chargeForm(){

    this.frmClasCreator.patchValue({
      nombre:this.trabajo.nombre,
      descrip:this.trabajo.descripcion,
      fechaini: this.trabajo.fecha_inicio,
      fechafin: this.trabajo.fecha_fin,
    });

  }

  crearTrabajo(){
    const payload = {
      id_trabajo: this.id_trabajo,
      data: this.frmClasCreator.value,
      id_empresa: this.id_empresa,
      tipo_doc: this.tipo_doc
    };

    this.frmGuardar.append('data', JSON.stringify(payload));
    this.frmGuardar.append('id_trabajo', JSON.stringify(this.id_trabajo));
    this.frmGuardar.append('tipo_doc', JSON.stringify(this.tipo_doc));

    if(this.edit ==0){
      this.apiAlid.crearTrabajo(this.frmGuardar)
      .subscribe((res:any)=>{
        this.mensaje = res.mensaje;
        this.sucess = true;
        Swal.fire('Trabajo creado exitosamente')
        this.router.navigateByUrl('/empresa/Trabajos/'+this.id_empresa+'/'+this.tipo_doc);

      });
    }else{

      this.apiAlid.editarTrabajo(this.frmGuardar)
      .subscribe((res:any)=>{
        this.mensaje = res.mensaje;
        this.sucess = true;
        Swal.fire('Trabajo editado exitosamente')
        this.router.navigateByUrl('/empresa/Trabajos/'+this.id_empresa+'/'+this.tipo_doc);

      });
    }

  }

}
