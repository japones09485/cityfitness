import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Examen } from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  id_empresa:number;
  id_examen:number;
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  frmAlumCreator: UntypedFormGroup;
  alumGuardar = new FormData();
  examen: Examen;
  mensaje: string;
  sucess:boolean;
  user:User;
  estadoex:boolean;
  constructor(private fb: UntypedFormBuilder,
              private apiAlid: AliadosService,
              private authApi:AuthService,
              private router:Router,
              private acRouter: ActivatedRoute,) { }

  ngOnInit(): void {

    this.initForm();
    this.user = this.authApi.getUser();
    $('#fechaini').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      modalColor: 'white', // Opción para cambiar el color del modal
      modalTextColor: 'black', // Opción para cambiar el color del texto en el modal
      change: (e) => {
        this.frmClasCreator.patchValue({
          fechaini: e.target.value
        });
      }
    });

    $('#fechafin').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fechafin: e.target.value
        });
      }
    });


    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id_empresa;
      this.id_examen = param.id_examen;

      if(this.id_examen >0){

        this.apiAlid.ExamenId(this.id_examen)
        .subscribe((res:any)=>{
          this.examen = res.examen;
          this.estadoex = true;
          this.chargeForm();

        });

      }
    });

   }

  initForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],
      fechaini: ['', Validators.required],
      fechafin: ['', Validators.required],
      numpreg: ['', Validators.required],
      numpregaprob: ['', Validators.required],
      duracion: ['', Validators.required],
      tipo_examen: ['', Validators.required]

    });
  }

  chargeForm(){

    this.frmClasCreator.patchValue({
      nombre:this.examen.nombre,
      descrip:this.examen.descripcion,
      fechaini: this.examen.fecha_inicio,
      fechafin: this.examen.fecha_fin,
      numpreg:  this.examen.numero_preguntas,
      numpregaprob:  this.examen.num_preg_aprobar,
      duracion:  this.examen.duracion,
      tipo_examen: this.examen.tipo_examen,
    });
  }

  crearExamen(){

    const payload = {
      user: this.id_empresa,
      idexamen: this.id_examen,
      data: this.frmClasCreator.value
    };

    if(this.id_examen ==0){
      this.apiAlid.crearExamen(payload)
      .subscribe((res:any)=>{
        this.mensaje = res.mensaje;
        this.sucess = true;
        setTimeout(() => {
          this.sucess = false;
           this.router.navigate( ['empresa/Examenes/',this.id_empresa] );
        }, 1200);

      });
    }else{
      this.apiAlid.editarExamen(payload)
      .subscribe((res:any)=>{
        this.mensaje = res.mensaje;
        this.sucess = true;
        setTimeout(() => {
          this.sucess = false;
           this.router.navigate( ['empresa/Examenes/',this.id_empresa] );
        }, 1200);

      });
    }

  }

}
