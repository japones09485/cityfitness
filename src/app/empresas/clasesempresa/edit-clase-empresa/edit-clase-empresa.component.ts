import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';   
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import { User, ClaAliad } from '../../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit-clase-empresa',
  templateUrl: './edit-clase-empresa.component.html',
  styleUrls: ['./edit-clase-empresa.component.css']
})
export class EditClaseEmpresaComponent implements OnInit {
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  sucess:boolean;
  mensaje: string;
  user: User;
  idAlid:number;
  clase:ClaAliad;
  id_empresa: number;
  id_clase: number;
  
  constructor(private fb: UntypedFormBuilder,
              private apiAlid:AliadosService,
              private authApi:AuthService,
              private router:Router,
              private acRouter: ActivatedRoute) { }

  ngOnInit(): void {


    this.initForm();
    this.sucess = false;
    $('#fechaClase').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fechapro: e.target.value
        });
      }
    });
    $('#horaClase').timepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'HH:MM',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          horapro: e.target.value
        });
      }
    });
    
    this.user = this.authApi.getUser();
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
      this.id_clase = param.idclase;
     
      this.id_empresa = param.idempresa;
      
      this.apiAlid.ClasexId(this.id_clase)
          .subscribe((res)=>{
           this.clase = res['data'];
           this.chargeForm();
            
          });
      
    });  
  }

  initForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],
      fechapro: ['', Validators.required],
      horapro: ['', Validators.required],
      idAliad: [this.idAlid , Validators.required]
    });
  }

  chargeForm(){

    this.frmClasCreator.patchValue({
      nombre:this.clase.clasA_nombre, 
      descrip:this.clase.claA_descrip,
      fechapro: this.clase.claA_fecha_proga,
      horapro: this.clase.claA_hora_proga,
      idAliad:  this.id_empresa
    });
  }

  editClase(){
    const payload = {
      id_edit: this.clase.claA_id,
      data: this.frmClasCreator.value
    };
   
    this.apiAlid.editarClase(payload)
                .subscribe((res:any )=>{
                if(res.sucess == true){
                  this.mensaje = res.mensaje;
                  this.sucess = true;
                  setTimeout(() => {
                    this.sucess = false;
                     this.router.navigate( ['clasesempresa/',this.id_empresa] );
                  }, 1200);

                }else{
                  this.sucess = true;
                  this.mensaje =  res.mensaje;
                  setTimeout(() => {
                    this.sucess = false;
                  }, 2000);
                }
      });
  }

}
