import { Component, OnInit } from '@angular/core';
import { Curso, RespCursos } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  creando = false;
  listado: Curso[] = [];
  flagSave = false;
  frmCurCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  imgCountry = '';
  pathIm = environment.pathImgs;
  cantidadPaginas = 0;
  cantidadCurso = 0;
  pagMostrar = 1;
  idEmpresa = 0;
  cantidadArr = new Array();
  ordenCurso:number;


  // variables editar curso
  cursoEditar: Curso = {};
  modeEditar = false;

  // variables clases
  verclases = false;
  constructor(
    public api: ApiRestService,
    private acRouter: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.idEmpresa = param.id;
      this.getListado();
    });
    this.inicializarForm();
  }

  crearCurso() {
    this.flagSave = true;
    this.frmGuardar.append('data', JSON.stringify(this.frmCurCreator.value));
    this.api.guardarCurso(this.frmGuardar)
      .subscribe((data: any) => {
        this.listado.unshift(data.data);
        this.flagSave = false;
        this.creando = false;
        this.frmCurCreator.reset();
        this.frmCurCreator.patchValue({
          cur_fk_empresa: [this.idEmpresa]
        });
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
        this.router.navigate(['/admin/cursos/' + this.idEmpresa]);
      });
  }

  pags(): any[] {
    return Array(this.cantidadPaginas);
  }

  obtenerPagina(pg: number) {
    this.pagMostrar = pg;
    this.getListado();
  }

  getListado() {
    this.api.getCursos(this.idEmpresa, this.pagMostrar)
      .subscribe((data: RespCursos) => {
        this.listado = data.lista;
        this.cantidadCurso = data.cantidad;
        this.ordenArr(this.cantidadCurso);


      });
  }

  updateOrden(fk_empresa:number,cur_id,orden:number){

      this.api.updateOrdenCurso(fk_empresa,cur_id,orden)
    .subscribe((res:any)=>{

      if (!res.success) {
        Swal.fire(
          'Mensaje de usuario',
          'Ya se encuentra un curso en ese orden.',
          'error'
        )

      }else{
        this.listado = res.data;
      }

    })

  }

  ordenArr(cantidad:number){

    for (let index = 1; index <= cantidad; index++) {
       this.cantidadArr.push(index);
    }

  }

  inicializarForm() {
    this.frmCurCreator = this.fb.group({
      cur_nombre: ['', [Validators.required]],
      cur_descripcion: ['', Validators.required],
      cur_estado: ['', Validators.required],
      cur_fk_empresa: [this.idEmpresa]
    });
  }

  cambioPais() {
    this.getImageCountry(this.frmCurCreator.get('ins_fk_pais').value);
  }

  getImageCountry(codigo: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === codigo);
    this.imgCountry = country.flag;
  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }

  editarCurso(curso: Curso) {
    this.modeEditar = true;
    this.cursoEditar = curso;
  }

  eliminarCurso(empresa:number,curso:number){

    Swal.fire({
      title: 'Mensaje de usuario',
      text:  'Desea eliminar este curso?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarCurso(empresa,curso)
    .subscribe((res:any) =>{
      console.log(res);

      this.listado = res.lista;
    })
      }
    })

  }

  recepcionCurEditado(curso: Curso) {
    const updateIt = this.listado.find((cur: Curso) => cur.cur_id === curso.cur_id);
    const index = this.listado.indexOf(updateIt);
    this.listado[index] = curso;
  }

  verClases(curso: Curso) {
    this.cursoEditar = curso;
    this.verclases = true;
  }
}
