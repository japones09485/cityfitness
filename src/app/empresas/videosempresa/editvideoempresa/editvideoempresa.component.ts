import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import { User,Videos } from 'src/app/interfaces/interfaces';
import {  ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-editvideoempresa',
  templateUrl: './editvideoempresa.component.html',
  styleUrls: ['./editvideoempresa.component.css']
})
export class EditvideoempresaComponent implements OnInit {
  frmVidCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave:boolean;
  up_video:boolean;
  sucess:boolean;
  upload:string; 
  mensaje:string;
  idAlid:number;
  user:User;
  video:Videos;
  id_empresa: number;
  id_video:number;
  

  constructor(private fb: UntypedFormBuilder,
    private apiAlid:AliadosService,
    private authApi:AuthService,
    private router: Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.sucess = false;
    this.user = this.authApi.getUser();
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.idempresa;
      this.id_video = param.idvideo;
      this.apiAlid.VideoxId(this.id_video)
          .subscribe((res)=>{
           this.video = res['data'];
           this.upload =  res['name_arch'];
           this.chargeForm();
          });
      
    });  
  }

  initForm(){
    this.frmVidCreator = this.fb.group({
      titulo: ['', Validators.required],
      descrip: ['', Validators.required],
      estado: ['', Validators.required],
      link: ['', Validators.required]
    });
  }

  chargeForm(){

    this.frmVidCreator.patchValue({
      titulo:this.video.vid_titulo, 
      descrip:this.video.vid_descripcion,
      link: this.video.vid_ruta,
      estado: this.video.vid_estado
    });
  }




  editarVideo(){
    const payload = {
      id_edit: this.video.vid_id,
      data: this.frmVidCreator.value
    };
    this.apiAlid.editarVideo(payload)
                .subscribe((res:any)=>{
                   if(res.sucess == true){
                    this.sucess = true;
                    this.mensaje = res.mensaje;
                    setTimeout(() => {
                      this.sucess = false;
                      this.router.navigate( ['videosempresa/',this.id_empresa] );
                      
                    }, 2300);
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
