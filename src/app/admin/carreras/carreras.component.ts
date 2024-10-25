import { Component, OnInit } from '@angular/core';
import { AliadosService } from 'src/app/services/aliados.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carreras, User } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css',
  
})
export class CarrerasComponent implements OnInit{

  carreras: Carreras[] = [];
  creando = false;
  edit=false;
  frmCliCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  UserLog: User;
  Idcarrera:number;
  carreraEdit:any;

  
  constructor(public ApiAliado: AliadosService,
    private service: AuthService,
    private router: Router,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.UserLog = this.service.getUser();
    this.Idcarrera = 0;
    this.listarCarreras();
    this.inicializarForm();

   
  }

  listarCarreras(){
    this.ApiAliado.listarCarreras().subscribe((res: any) => {
      this.carreras = res.carreras;
    });
  }


  inicializarForm() {
    this.frmCliCreator = this.fb.group({
      nombre: ['', Validators.required],
      puntaje: ['', Validators.required],
      sistema: ['', Validators.required],
      nivel: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  popularForm() {
    this.frmCliCreator = this.fb.group({
      nombre: [this.carreraEdit.nombre, Validators.required],
      puntaje: [this.carreraEdit.puntaje, Validators.required],
      sistema: [this.carreraEdit.sistema, Validators.required],
      nivel: [this.carreraEdit.nivel, Validators.required],
      estado: [this.carreraEdit.estado, Validators.required]  
    });
  }



  crearCarrera(IdCarrera){
    this.frmGuardar.append('data', JSON.stringify(this.frmCliCreator.value));
    this.frmGuardar.append('user', JSON.stringify(this.UserLog.usu_id));
  
    if(!this.edit && IdCarrera ==0){
      this.ApiAliado.guardarCarrera(this.frmGuardar)
      .subscribe((res: any) => {
        this.carreras = res.carreras;
        Swal.fire(res.mensaje);
        this.inicializarForm();
      });
    }else if(this.edit && IdCarrera >0){
      this.frmGuardar.append('idCarrera', JSON.stringify(IdCarrera));

      this.ApiAliado.EditarCarrera(this.frmGuardar)
      .subscribe((res: any) => {
        this.carreraEdit = res.carrera;
        Swal.fire(res.mensaje);
        this.popularForm();
      });
     
    }
   
  }

  NuevaCarrera(){
    this.Idcarrera = 0;
    this.creando = true;
    this.edit = false;
    this.inicializarForm();
  }

  claseEliminar(idCarrera){
    Swal.fire({
      title: "Dese eliminar la carrera?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.ApiAliado.EliminarCarrera(idCarrera)
        .subscribe((res:any)=>{
          this.carreras = res.carreras;
          Swal.fire(res.mensaje, "", "success");
        });
       
      } 
    });
  }

  InfoCarrera(idCarrera){

    this.Idcarrera=idCarrera;
    this.ApiAliado.InfoCarrera(idCarrera)
      .subscribe((res: any) => {

        this.carreraEdit = res.carrera;
        this.creando = true;
        this.edit = true;
        this.popularForm();
      
    
      });
  }

  Volver(){
    this.listarCarreras();
    this.creando = false;
    
  }



}
