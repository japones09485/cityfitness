import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Curso, Clase, RespClases, Instructor } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-clases-curso',
  templateUrl: './clases-curso.component.html',
  styleUrls: ['./clases-curso.component.css']
})
export class ClasesCursoComponent implements OnInit {

  $: any;
  @Input() curso: Curso = {};
  @Output() retToCur = new EventEmitter<boolean>();

  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  creando = false;
  flagSave = false;

  clases: Clase[] = [];
  instructores: Instructor[] = [];
  imgInstructor = '';
  pathIm = environment.pathImgs;
  tipo = '0';
  editando = false;
  claseEditando: Clase;
  claseEliminar: number;

  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getClases();
    this.getInstructores();
    this.incializarForm();
    // inicializacion de objeto jquery
    $('#fechaClase').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          clas_fecha_inicio: e.target.value
        });
      }
    });
    $('#horaClase').timepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'HH:MM',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          clas_hora: e.target.value
        });
      }
    });
  }

  cambiarTipo() {
    this.tipo = this.frmClasCreator.get('clas_tipo').value;
    if (this.tipo === '0') {
      this.frmClasCreator.patchValue({
        clas_fk_instructor: '0',
        clas_enlace: '-'
      });
    } else {
      this.frmClasCreator.patchValue({
        clas_fk_instructor: '',
        clas_enlace: '',
      });
    }
  }

  getClases() {
    this.api.getClasesCurso(this.curso.cur_id)
      .subscribe((res: RespClases) => {
        this.clases = res.data;
      });
  }

  getInstructores() {
    this.api.getInstructoresCliente(this.curso.cur_fk_empresa)
      .subscribe((res: any) => {
        this.instructores = res.lista;
      });
  }

  incializarForm() {
    this.frmClasCreator = this.fb.group({
      clas_nombre: ['', Validators.required],
      clas_descripcion: ['', Validators.required],
      clas_fecha_inicio: ['', Validators.required],
      clas_hora: ['', Validators.required],
      clas_fk_instructor: ['', Validators.required],
      clas_fk_curso: [this.curso.cur_id, Validators.required],
      clas_tipo: ['', Validators.required],
      clas_estado: ['', Validators.required],
      clas_valor: ['', Validators.required],
      clas_enlace: ['', Validators.required],
    });
  }



  retornarToCursos() {
    this.retToCur.emit(false);
  }

  crearClase() {
    this.flagSave = true;
    this.api.guardarClase(this.frmClasCreator.value)
      .subscribe((res: any) => {
        this.clases.unshift(res.data);
        this.flagSave = false;
        this.creando = false;
        this.frmClasCreator.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
      });
  }

  cambioInstructor() {
    const idIns = this.frmClasCreator.get('clas_fk_instructor').value;
    const inst = this.instructores.find((ins: Instructor) => ins.ins_id === idIns);
    this.imgInstructor = this.pathIm + inst.ins_foto1;
  }

  editarClase(clase: Clase) {
    this.editando = true;
    this.claseEditando = clase;
  }

  claseEditada(ev: Clase) {
    const updateIt = this.clases.find((cla: Clase) => cla.clas_id === ev.clas_id);
    const index = this.clases.indexOf(updateIt);
    this.clases[index] = ev;
  }

  eliminarClase() {
    this.flagSave = true;
    this.api.eliminarClase(this.claseEliminar)
      .subscribe((res: any) => {
        if (res.ok === true) {
          this.clases.filter(cl => Number(cl.clas_id) !== this.claseEliminar);
          this.flagSave = false;
          this.api.mensajeUser = 'Clase eliminada';
          this.api.mostrarMsj = true;
        }
      });
  }

  nuevaClase() {
    this.creando = true;
    this.frmClasCreator.reset();
    this.frmClasCreator.patchValue({
      clas_fk_curso: this.curso.cur_id
    });
  }

}
