import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { AliadosService } from '../../../../services/aliados.service';
import {AuthService } from '../../../../services/auth.service';
import { User } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevo-video',
  templateUrl: './nuevo-video.component.html',
  styleUrls: ['./nuevo-video.component.css']
})
export class NuevoVideoComponent implements OnInit {
  frmVidCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave:boolean;
  up_video:boolean;
  sucess:boolean;
  upload:string; 
  mensaje:string;
  idAlid:number;
  user:User;

  constructor(private fb: UntypedFormBuilder,
              private apiAlid:AliadosService,
              private authApi:AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.idAlid = this.user.usu_id;
    this.upload = 'Adjunte el archivo en formato MP4';
    this.initForm();
  }



  initForm(){
    this.frmVidCreator = this.fb.group({
      titulo: ['', Validators.required],
      descrip: ['', Validators.required],
      estado: ['', Validators.required],
      link: ['', Validators.required],
      idAliad: [this.idAlid , Validators.required]
    });
  }



  crearVideo(){
    this.flagSave = true;
    this.frmGuardar.append('data', JSON.stringify(this.frmVidCreator.value));
    this.frmGuardar.append('id_aliado', JSON.stringify(this.user.usu_id));
    this.apiAlid.GuardarVideo(this.frmGuardar)
                  .subscribe((res:any)=>{
                      this.flagSave = false;
                      if(res.sucess == true){
                        this.frmVidCreator.reset();
                        this.upload = 'Adjunte el archivo en formato MP4';
                        this.sucess = true;
                        this.mensaje = res.mensaje;
                        setTimeout(() => {
                          this.sucess = false;
                          this.router.navigate( ['adminAlid/videos']);
                        }, 2500);
                      }
                  }); 
  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;
   
    if( ev.target.files[0].type =='video/mp4' ){
      this.upload = ev.target.files[0].name;
      this.up_video = true;
      if (imgs.files.length > 0) {
        this.frmGuardar.append(`${numFile}`, imgs.files[0]);
      }
    }else{
      this.up_video = false;
      this.sucess = true;
      this.mensaje = 'Formato Invalido, solo se admite .MP4';
      setTimeout(() => {
        this.sucess = false;
      }, 5000);
    }
    
  
  }
}
