import { Component, OnInit,Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';   
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import { User, ClaAliad } from '../../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-new-clase-empresa',
  templateUrl: './new-clase-empresa.component.html',
  styleUrls: ['./new-clase-empresa.component.css']
})
export class NewClaseEmpresaComponent implements OnInit {
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  sucess:boolean;
  mensaje: string;
  user: User;
  idAlid:number;
  id_empresa:number;


  constructor(  private fb: UntypedFormBuilder,
                private apiAlid:AliadosService,
                private authApi:AuthService,
                private router:Router,
                private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
     
    }); 
    this.user = this.authApi.getUser();
    this.initForm();

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
  }

  initForm(){
    this.frmClasCreator = this.fb.group({
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],
      fechapro: ['', Validators.required],
      horapro: ['', Validators.required],
      idAliad: [this.id_empresa , Validators.required]
    });
  }

  progClase(){
    this.apiAlid.programarClase(this.frmClasCreator.value)
      .subscribe((res: any) => {
        if (res.sucess == true){
          this.sucess = true;
          this.mensaje =  res.mensaje;
          setTimeout(() => {
            this.sucess = false;
            this.router.navigate( ['clasesempresa/',this.id_empresa] );
          }, 1500);
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

