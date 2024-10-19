import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Instructor, Clase } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';

declare var $: any;

@Component({
  selector: 'app-editar-clase',
  template: `
  <div class="card mt-2" >
            <h2 class="card-header text-center"><a (click)="emt.emit(false)"><i
                        class="fas fa-arrow-alt-circle-left float-left text-danger"></i></a> Editar Clase</h2>
            <div class="card-body">
    <form [formGroup]="frmClasEditor" (ngSubmit)="editarClase()">
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Nombre</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" formControlName="clas_nombre" />
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Descripción</label>
            <div class="col-sm-10">
                <textarea type="text" class="form-control" formControlName="clas_descripcion"></textarea>
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Fecha</label>
            <div class="col-sm-10">
                <input type="text" id="fechaClaseEdit" class="form-control" formControlName="clas_fecha_inicio"
                    readonly="readonly" />
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Hora</label>
            <div class="col-sm-10">
                <input type="text" id="horaClaseEdit" readonly="readonly" class="form-control"
                    formControlName="clas_hora" />
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Tipo</label>
            <div class="col-sm-10">
                <select type="email" (change)="cambiarTipo()" class="form-control"
                    formControlName="clas_tipo">
                    <option value="0" selected="selected">Personalizado</option>
                    <option value="1">Grupal</option>
                </select>
            </div>
        </div>
        <div class="form-group row" *ngIf="tipo == '1'">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Instructor</label>
            <div class="col-sm-8">
                <select class="form-control" formControlName="clas_fk_instructor"
                    (change)="cambioInstructor()">
                    <option *ngFor="let inst of instructs" [ngValue]="inst.ins_id">
                        {{ inst.ins_nombre +' '+ inst.ins_apellido }}
                    </option>
                </select>
            </div>
            <div class="col-sm-2">
                <img *ngIf="imgInstructor" [src]="imgInstructor" class="avatar" />
            </div>
        </div>
        <div class="form-group row" *ngIf="tipo == '1'">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Link zoom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" formControlName="clas_enlace" />
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Valor</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" formControlName="clas_valor" />
            </div>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail1" class="form-label col-sm-2">Estado</label>
            <div class="col-sm-10">
                <select type="email" class="form-control" formControlName="clas_estado">
                    <option value="1" selected="selected">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
        </div>
        <div class="fa-3x text-center" *ngIf="flagSave">
            <i class="fas fa-spinner fa-pulse"></i>
        </div>
        <button type="submit" *ngIf="frmClasEditor.valid && !flagSave"
            class="btn btn-danger btn-block">Guardar</button>
    </form>
    </div>
    </div>
  `
})
export class EditarClaseComponent implements OnInit {

  $: any;
  @Input() instructs: Instructor[] = [];
  @Input() clase: Clase = {};
  @Output() outClase = new EventEmitter<Clase>();
  @Output() emt = new EventEmitter<boolean>();

  frmClasEditor: UntypedFormGroup;
  flagSave = false;
  imgInstructor = '';
  pathIm = environment.pathImgs;
  tipo = '';
  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.incializarForm();
    // inicializacion de objeto jquery
    $('#fechaClaseEdit').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasEditor.patchValue({
          clas_fecha_inicio: e.target.value
        });
      }
    });
    $('#horaClaseEdit').timepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'HH:MM',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasEditor.patchValue({
          clas_hora: e.target.value
        });
      }
    });
  }

  incializarForm() {
    this.tipo = this.clase.clas_tipo;
    this.frmClasEditor = this.fb.group({
      clas_nombre: [this.clase.clas_nombre, Validators.required],
      clas_descripcion: [this.clase.clas_descripcion, Validators.required],
      clas_fecha_inicio: [this.clase.clas_fecha_inicio, Validators.required],
      clas_hora: [this.clase.clas_hora, Validators.required],
      clas_fk_instructor: [this.clase.clas_fk_instructor, Validators.required],
      clas_fk_curso: [this.clase.clas_fk_curso, Validators.required],
      clas_tipo: [this.clase.clas_tipo, Validators.required],
      clas_estado: [this.clase.clas_estado, Validators.required],
      clas_valor: [this.clase.clas_valor, Validators.required],
      clas_enlace: [this.clase.clas_enlace, Validators.required],
    });
  }

  cambioInstructor() {
    const idIns = this.frmClasEditor.get('clas_fk_instructor').value;
    const inst = this.instructs.find((ins: Instructor) => ins.ins_id === idIns);
    this.imgInstructor = this.pathIm + inst.ins_foto1;
  }

  cambiarTipo() {
    this.tipo = this.frmClasEditor.get('clas_tipo').value;
    if (this.tipo === '0') {
      this.frmClasEditor.patchValue({
        clas_fk_instructor: '0',
        clas_enlace: '-'
      });
    } else {
      this.frmClasEditor.patchValue({
        clas_fk_instructor: '',
        clas_enlace: '',
      });
    }
  }

  editarClase() {
    this.flagSave = true;
    const payload = {
      id_edit: this.clase.clas_id,
      data: this.frmClasEditor.value
    };
    this.api.editarClase(payload)
      .subscribe((res: any) => {
        this.outClase.emit(res.data);
        this.flagSave = false;
        this.frmClasEditor.reset();
        this.api.mensajeUser = 'Editado correctamente correctamente';
        this.api.mostrarMsj = true;
        this.emt.emit(false);
      });
  }

}
