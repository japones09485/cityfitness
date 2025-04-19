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
  user:User;
  perfilUser : string;

  constructor(
    public api: ApiRestService,
    private fb: FormBuilder,
    private acRouter: ActivatedRoute,
    private service: AuthService
  ) { }

  ngOnInit(): void {

    
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.perfilUser = this.user.usu_perfil;

    this.UserLog = this.service.getUser();
    this.acRouter.params.subscribe(param => {
      this.fkGim = param.fk_gim;
      this.idSede = param.idSede;
      
      this.api.getSedesClase(this.fkGim,this.idSede)
        .subscribe((res:any)=>{
          this.list = res.lista;
        
        })
      });

      this.api.listarInsS(this.idSede)
      .subscribe((data: any) => {
       
        this.Instructores = data.instructoresSede;
       
      });



      this.initForm();

     
      
  }

  initForm() {
    this.frmClase = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dia: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraFin: ['', Validators.required],
      instructor: ['', Validators.required],
      estado: ['', Validators.required]

    });
  }

  nameInstructor(idIns:number) {
   
    const instructor = this.Instructores.find(ins => ins.ins_id === idIns);
   
    return instructor.nombre_completo;
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
      dia: [idClase.clas_dia, Validators.required],
      HoraInicio: [idClase.hora_inicio, Validators.required],
      HoraFin: [idClase.hora_fin, Validators.required],
      instructor: [idClase.clas_fk_instructor, Validators.required],
      estado: [idClase.estado, Validators.required]


    });

   
  }

  DeleteClase(idClase:number,idSede:number){

    Swal.fire({
      title: "Desea eliminar esta clase?",
      showDenyButton: true,
      confirmButtonText: "SI",
     
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

  getDayInfo(dayNumber: number): { dia: string; class: string } {
    const dayMap: { [key: number]: { dia: string; class: string } } = {
      1: { dia: 'Lunes', class: 'bg-lunes' },
      2: { dia: 'Martes', class: 'bg-martes' },
      3: { dia: 'Miércoles', class: 'bg-miercoles' },
      4: { dia: 'Jueves', class: 'bg-jueves' },
      5: { dia: 'Viernes', class: 'bg-viernes' },
      6: { dia: 'Sábado', class: 'bg-sabado' },
      7: { dia: 'Domingo', class: 'bg-domingo' }
    };
  
    return dayMap[dayNumber] || { dia: 'Número inválido', class: 'bg-dark' };
  }

}
