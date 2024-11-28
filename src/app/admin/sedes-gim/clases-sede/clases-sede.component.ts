import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClasesSede,Instructor,User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clases-sede',
  templateUrl: './clases-sede.component.html',
  styleUrl: './clases-sede.component.css'
})
export class ClasesSedeComponent implements OnInit{

  fkGim : number;
  idSede : number;
  list: ClasesSede[] = [];
  Instructores: any;
  frmClases=new FormData();
  frmClase: UntypedFormGroup;
  UserLog: User;
  searchIns = '';

  constructor(
    public api: ApiRestService,
    private fb: FormBuilder,
    private acRouter: ActivatedRoute,
    private service: AuthService
  ) { }

  ngOnInit(): void {

    this.UserLog = this.service.getUser();
    this.acRouter.params.subscribe(param => {
      this.fkGim = param.fk_gim;
      this.idSede = param.idSede;
      
      this.api.getSedesClase(this.fkGim,this.idSede)
        .subscribe((res:any)=>{
          this.list = res.lista;
        })
      });

      this.api.getInstructoresAll()
      .subscribe((res:any)=>{
      
        this.Instructores = res.instructores;
        
      });

      this.initForm();

     
      
  }

  initForm() {
    this.frmClase = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fInicial: ['', Validators.required],
      fFinal: ['', Validators.required],
      instructor: ['', Validators.required]
    });
  }

  nameInstructor(idIns:number) {
    const instructor = this.Instructores.find(ins => ins.id === idIns);
    return instructor.nombre;
}


  crearClase(){
    this.frmClases.append('data', JSON.stringify(this.frmClase.value));
    this.frmClases.append('user', JSON.stringify(this.UserLog.usu_id));
    this.frmClases.append('gim', JSON.stringify(this.fkGim));
    this.frmClases.append('sede', JSON.stringify(this.idSede));


    this.api.createClaseSed(this.frmClases)
      .subscribe((data: any) => {
        this.list = data.lista;
        this.frmClase.reset();
        Swal.fire("Clase creada exitosamente");
       

      });
  }

  EditClase(idClase:number){
    this.frmClases.append('data', JSON.stringify(this.frmClase.value));
    this.frmClases.append('user', JSON.stringify(this.UserLog.usu_id));
    this.frmClases.append('gim', JSON.stringify(this.fkGim));
    this.frmClases.append('sede', JSON.stringify(this.idSede));
    this.frmClases.append('idClase', JSON.stringify(idClase));

    this.api.EditClase(this.frmClases)
      .subscribe((data: any) => {
        this.list = data.lista;
        this.frmClase.reset();
        Swal.fire("Clase editada exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      });
  }

  InfoEdit(idClase:any){

    this.frmClase = this.fb.group({
      nombre: [idClase.clas_nombre, Validators.required],
      descripcion: [idClase.clas_descripcion, Validators.required],
      fInicial: [idClase.fecha_inicio, Validators.required],
      fFinal: [idClase.fecha_fin, Validators.required],
      instructor: [idClase.clas_fk_instructor, Validators.required]
    });

   
  }

  DeleteClase(idClase:number,idSede:number){

    Swal.fire({
      title: "Desea eliminar esta clase?",
      showDenyButton: true,
      confirmButtonText: "SI",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.DeleteClase(idClase,idSede)
      .subscribe((data: any) => {
        this.list = data.lista;
        Swal.fire("Clase eliminada exitosamente");
    
      });
      } 
    });

    
  }

}
