import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gimnasio, Paises } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gimnasio-editar',
  templateUrl: './editar-gimnasio.component.html',
})
export class EditarGimnasioComponent implements OnInit {

  @Input() gimnasio: Gimnasio;
  @Output() editer = new EventEmitter<boolean>();
  @Output() gim = new EventEmitter<Gimnasio>();
  frmGimnasioEdit: UntypedFormGroup;
  frmGuardar = new FormData();
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathIm = environment.pathImgs;
  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  
    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
      this.banderaPais(this.gimnasio.gim_pais);
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });
  }

  initForm(){
    this.frmGimnasioEdit = this.fb.group({
      nombre: [this.gimnasio.gim_nombre, Validators.required],
      nit: [this.gimnasio.gim_nit, Validators.required],
      email: [this.gimnasio.gim_email, [Validators.required, Validators.email]],
      facebook: [this.gimnasio.gim_facebook, Validators.required],
      instagram: [this.gimnasio.gim_instagram, Validators.required],
      pais: [this.gimnasio.gim_pais, Validators.required],
      ciudad: [this.gimnasio.gim_ciudad, Validators.required],
      telefono: [this.gimnasio.gim_telefono, Validators.required],
      descripcion: [this.gimnasio.gim_descripcion, Validators.required],
      mapa: [this.gimnasio.gim_mapa, Validators.required],
      ruta: [this.gimnasio.gim_ruta, Validators.required],
      estado: [this.gimnasio.gim_estado, Validators.required]
    });
  }

  cambioPais() {
    this.banderaPais(this.frmGimnasioEdit.get('pais').value);
  }

  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

  guardarEditGimnasio(){
    this.frmGimnasioEdit.value.id_edit = this.gimnasio.gim_id;
    this.frmGuardar.append('data', JSON.stringify(this.frmGimnasioEdit.value));
    this.api.saveEditGym(this.frmGuardar)
      .subscribe((data: any) => {
        this.frmGimnasioEdit.reset();
        this.api.mensajeUser = 'Editado correctamente';
        this.api.mostrarMsj = true;
        this.editer.emit(false);
        this.gim.emit(data.data);
      });
  }

  back(){
    this.editer.emit(false);
    this.gim.emit(this.gimnasio);
  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }
}
