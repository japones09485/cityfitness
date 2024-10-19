import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import {  ApiRestService} from 'src/app/services/api-rest.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-websociosempresascreate',
  templateUrl: './websociosempresascreate.component.html',
  styleUrls: ['./websociosempresascreate.component.css']
})
export class WebsociosempresascreateComponent implements OnInit {
  EmpCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave:boolean;
  flagGuardado:boolean;
  socio:any;
  nomsocio:string;
  user:any;


  constructor(private authApi:AuthService,
              private api : ApiRestService,
              private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();

    this.api.traerIdSocio(this.user.usu_fk_socio)
    .subscribe((res:any)=>{
      this.socio = res.socio
      this.nomsocio = this.socio.soc_nombre;
    });
    this.initForm();
  }

  initForm(){
    this.EmpCreator = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram:  ['', Validators.required],
      pagina: ['', [Validators.required]]
    });
  }


  crearEmpresa(){
    this.frmGuardar.append('data', JSON.stringify(this.EmpCreator.value));
    this.frmGuardar.append('socio', JSON.stringify( this.user.usu_fk_socio));


    this.api.CrearEmpresaWs(this.frmGuardar)
      .subscribe((res: any) => {
        this.EmpCreator.reset();
        this.api.mensajeUser = 'Empresa creada correctamente';
        this.api.mostrarMsj = true;

      });
  }



  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }
  }

}
