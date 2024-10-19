import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';   
import { AliadosService } from '../../../../services/aliados.service';
import {AuthService } from '../../../../services/auth.service';
import { User, ClaAliad } from '../../../../interfaces/interfaces';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.css']
})
export class NuevaClaseComponent implements OnInit {
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  sucess:boolean;
  mensaje: string;
  user: User;
  idAlid:number;


  constructor(  private fb: UntypedFormBuilder,
                private apiAlid:AliadosService,
                private authApi:AuthService,
                private router:Router) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.idAlid = this.user.usu_id;
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
      idAliad: [this.idAlid , Validators.required]
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
            this.router.navigate( ['adminAlid/clases'] );
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
