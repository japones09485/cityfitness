import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  @Input() curso: Curso = {};
  @Output() cursoEditado = new EventEmitter<Curso>();
  @Output() editado = new EventEmitter<boolean>();
  frmCurEdit: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave = false;
  constructor(
    public api: ApiRestService,
    private acRouter: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.frmCurEdit = this.fb.group({
      cur_nombre: [this.curso.cur_nombre, Validators.required],
      cur_descripcion: [this.curso.cur_descripcion, Validators.required],
      cur_estado: [this.curso.cur_estado, Validators.required],
      cur_fk_empresa: [this.curso.cur_fk_empresa],
    });
  }

  guardarEditar() {
    this.flagSave = true;
    const payload = {
      id_edit: this.curso.cur_id,
      data: this.frmCurEdit.value
    };
    this.frmGuardar.append('data', JSON.stringify(payload));
    this.api.guardarEditadocurso(this.frmGuardar)
      .subscribe((data: any) => {
        this.curso = data.data;
        this.flagSave = false;
        this.editado.emit(false);
        this.frmCurEdit.reset();
        this.api.mensajeUser = 'Editado correctamente';
        this.api.mostrarMsj = true;
        this.cursoEditado.emit(this.curso);
      });

  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }


}
