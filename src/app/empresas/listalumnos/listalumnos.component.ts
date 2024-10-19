import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AliadosService } from '../../services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService } from '../../services/auth.service';
import { User, ListAlumnos } from '../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listalumnos',
  templateUrl: './listalumnos.component.html',
  styleUrls: ['./listalumnos.component.css']
})
export class ListalumnosComponent implements OnInit {
  frmAlumCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  cantPaginas: number;
  sucess: boolean;
  mensaje: string;
  user: User;
  idAlid: number;
  meses: number;
  alumnos: ListAlumnos[] = [];
  id_empresa: number;

  constructor(private fb: UntypedFormBuilder,
    public router: Router,
    private apiAlid: AliadosService,
    private api: ApiRestService,
    private authApi: AuthService,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.idempresa;


      this.initForm();
      this.idAlid = this.id_empresa;

      //examenes de recuperación

      this.apiAlid.ListarAlumnos(this.idAlid)
        .subscribe((res: any) => {
              this.alumnos = res.alumnos;
              this.cantPaginas = res.cant_pag;
        });
    });
  }

  initForm() {
    this.frmAlumCreator = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      meses: ['', Validators.required]
    });
  }

  Inscripcion() {
    this.apiAlid.InscribirAlumno(this.frmAlumCreator.value, this.idAlid)
      .subscribe((res: any) => {
        this.sucess = true;
        if (res.sucess == true) {
          this.initForm();
          this.alumnos.unshift(res.alumno);
        }
        this.mensaje = res.mensaje
        setTimeout(() => {
          this.initForm();
          this.sucess = false;
        }, 4000);
      });
  }

  banderaalumno(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  ampliarSubsripcion(id_alum: number, meses: number, fecha_fin: string) {
    this.apiAlid.ampliarSubsripcion(id_alum, this.idAlid, fecha_fin, meses)
      .subscribe((res: any) => {
        if (res.sucess == true) {
          this.ngOnInit();
        }
      });
  }

  eliminarSubscripcion(id_reg:number,alumno:number,aliado:number){
    Swal.fire({
      title: 'Mensaje de usuario',
      text:  'Desea Eliminar este alumno?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiAlid.EliminarAlumno(id_reg,alumno,aliado)
        .subscribe((res:any)=>{
          this.alumnos = res.data;

        });
      }
    })





  }

  sigPag(pagina: number) {
    console.log(pagina);

    this.apiAlid.ListarAlumnos(this.idAlid,pagina)
    .subscribe((res: any) => {
          this.alumnos = res.alumnos;
    });
  }

}

