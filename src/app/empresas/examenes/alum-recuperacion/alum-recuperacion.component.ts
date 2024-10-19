import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { User,alumRecuperta } from 'src/app/interfaces/interfaces';
import { AliadosService } from 'src/app/services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alum-recuperacion',
  templateUrl: './alum-recuperacion.component.html',
  styleUrls: ['./alum-recuperacion.component.css']
})
export class AlumRecuperacionComponent implements OnInit {
  frmAlumCreator: UntypedFormGroup;
  sucess: boolean = false;
  mensaje:string;
  user:User;
  Aliado:number;
  idExamen:number;
  alumnos: alumRecuperta[] = [];

  constructor(private fb: UntypedFormBuilder,
    public router: Router,
    private apiAlid:AliadosService,
    private api:ApiRestService,
    private authApi:AuthService,
    private acRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.Aliado =  this.user.usu_id;
    this.acRouter.params.subscribe(param => {
      this.idExamen = param.id_examen
    });
    this.initForm();
    this.apiAlid.List_alum_examen(this.idExamen)
    .subscribe((res:any)=>{
      this.alumnos = res.alumnos
    } )
  }

  initForm(){
    this.frmAlumCreator = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }


  Inscripcion(){

    const payload = {
      data: this.frmAlumCreator.value,
      aliado: this.Aliado,
      examen: this.idExamen
    };

    this.apiAlid.Inscri_alum_examen(payload)
    .subscribe((res:any)=>{
      this.sucess = true;
      this.mensaje = res.mensaje;
      this.alumnos = res.alumnos
    });


  }

  eliminarAlum(id_rec:number){

    Swal.fire({
      title: 'Desea eliminar el alumno?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiAlid.eliminar_alum_examen(id_rec,this.idExamen)
        .subscribe((res:any)=>{
          this.sucess = true;
          this.mensaje = res.mensaje;
          this.alumnos = res.alumnos
        });
        Swal.fire('Eliminado exitosamente!', '', 'error')
      }
    })

  }

}
