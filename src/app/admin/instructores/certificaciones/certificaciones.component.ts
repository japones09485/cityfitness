import { Component, OnInit } from '@angular/core';
import { Curso, RespCursos } from 'src/app/interfaces/interfaces';
import { AliadosService } from 'src/app/services/aliados.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent implements OnInit {

  creando = false;
  frmInsCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  idAliado:number;
  lista:any;
  idCert = 0;
  certificacion:any;
  validVista:number;
  pathIm = environment.pathImgs;

  constructor( public api: AliadosService,
    private acRouter: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();

    this.acRouter.params.subscribe(param => {
      this.idAliado = param.idaliados;
      this.validVista = param.vista;

      this.api.CertificacionAliado(this.idAliado)
      .subscribe((res:any)=>{
        this.lista = res.data;

      });


    });
  }

  initForm(){
    this.frmInsCreator = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  NuevoCert(){
    this.initForm();
    this.creando = true;
  }

  crearCertificacion(){
    this.frmGuardar.append('idcerti', JSON.stringify(this.idCert));
    this.frmGuardar.append('data', JSON.stringify(this.frmInsCreator.value));
    this.frmGuardar.append('idAliado', JSON.stringify(this.idAliado));

    this.api.crearCertificacion(this.frmGuardar)
    .subscribe((res: any) => {

      this.lista =  res.data;
      Swal.fire(res.mensaje);
      this.creando = false

    });

  }

  agregarArchivo(ev: any, numFile: number) {

    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }

  EditaCerti(idcerti:number){
      this.api.certiId(idcerti)
      .subscribe((res:any)=>{
        this.certificacion = res.certificacion;
        this.idCert = this.certificacion.id
        this.changeForm();
        this.creando = true;
      });
  }

  changeForm(){
    this.frmInsCreator.patchValue({
      descripcion: this.certificacion.descripcion
    });
  }

  DeleteCert(idcerti:number){

    Swal.fire({
      title: "Desea eliminar esta certificación?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.DeleteCert(idcerti,this.idAliado)
        .subscribe((res:any)=>{
          Swal.fire(res.mensaje);
          this.creando = false;
          this.lista =  res.data;

        });
      }
    });

  }

  downloadDoc(urlDocumento: string) {
    if(urlDocumento){
      urlDocumento = this.pathIm + urlDocumento;
      window.open(urlDocumento, '_blank');
    }else{
      Swal.fire('No hay documento cargado.');
    }

  }

}
