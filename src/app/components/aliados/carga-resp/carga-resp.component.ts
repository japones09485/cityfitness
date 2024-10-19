import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Trabajo} from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-resp',
  templateUrl: './carga-resp.component.html',
  styleUrls: ['./carga-resp.component.css']
})
export class CargaRespComponent implements OnInit {
  frmClasCreator : UntypedFormGroup;
  frmGuardar = new FormData();
  respuesta : any;ç
  id_trabajo : number;
  user:User;

  constructor(private fb: UntypedFormBuilder,
    private authApi:AuthService,
    private apiAlid: AliadosService,
    private router:Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.acRouter.params.subscribe(param => {
    this.id_trabajo = param.id_trabajo;
    this.initForm();
     });
  }

  crearRespuesta(){
    var aliado  = JSON.parse( sessionStorage.getItem('idAliado'));
    const payload = {
      usuario_cre: aliado,
      id_trabajo: this.id_trabajo,
      data: this.frmClasCreator.value,
      alumno:this.user.usu_id

    };

    this.frmGuardar.append('data', JSON.stringify(payload));
    this.apiAlid.GuardarRespuestaAl(this.frmGuardar)
    .subscribe((res:any)=>{
      if(res.success == true){
        Swal.fire(
          'Mensaje de usuario',
          'Documento cargado exitosamente',
          'success'
        )
        this.router.navigate(['aliados/FanPag/'+aliado]);
      }
    })

  }

  agregarArchivo(event: any, numImg: number) {

    const imgs: any = event.target;

    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }


  }

  initForm(){
    this.frmClasCreator = this.fb.group({
      comentarios: ['', Validators.required],
      link: [''],
    });
  }



}
