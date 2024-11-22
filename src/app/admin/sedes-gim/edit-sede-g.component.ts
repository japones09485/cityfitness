import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SedesGim, Paises } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-sede-g',
  templateUrl: './edit-sede-g.component.html',
  styleUrls: ['./edit-sede-g.component.css']
})
export class EditSedeGComponent implements OnInit {

  @Input() sedeG: SedesGim;
  @Output() editer = new EventEmitter<boolean>();
  @Output() sed = new EventEmitter<SedesGim>();
  frmSede: UntypedFormGroup;
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
   
    this.initForm()
    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
      this.banderaPais(this.sedeG.sed_pais);
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });
   
  }

  initForm() {
    this.frmSede = this.fb.group({
      nombre: [this.sedeG.sed_nombre, Validators.required],
      nit: [this.sedeG.sed_nit, Validators.required],
      email: [this.sedeG.sed_email, [Validators.required, Validators.email]],
      facebook: [this.sedeG.sed_facebook, Validators.required],
      instagram: [this.sedeG.sed_instagram, Validators.required],
      telefono: [this.sedeG.sed_telefono, Validators.required],
      descripcion: [this.sedeG.sed_descripcion, Validators.required],
      mapa: [this.sedeG.sed_mapa, Validators.required],
      ruta: [this.sedeG.sed_ruta, Validators.required],
      servicios: [this.sedeG.sed_servicios, Validators.required],
      horarios: [this.sedeG.sed_horarios, Validators.required],
      precio_m: [this.sedeG.sed_precio_mes, Validators.required],
      link_mes: [this.sedeG.sed_link_mes, Validators.required],
      precio_t: [this.sedeG.sed_precio_trimestre, Validators.required],
      link_tri: [this.sedeG.sed_link_trimestre, Validators.required],
      precio_sm: [this.sedeG.sed_precio_semestre, Validators.required],
      link_sem: [this.sedeG.sed_link_semestre, Validators.required],
      pais: [this.sedeG.sed_pais, Validators.required],
      ciudad: [this.sedeG.sed_ciudad, Validators.required]
    });
  }

  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

   cambioPais() {
    this.banderaPais(this.frmSede.get('pais').value);
  }

   guardarEditSede(){
    this.frmSede.value.id_edit = this.sedeG.sed_id;
    this.frmGuardar.append('data', JSON.stringify(this.frmSede.value));
    this.api.guardarEditSede(this.frmGuardar)
      .subscribe((data: any) => {
        this.frmSede.reset();
        this.api.mensajeUser = 'Editado correctamente';
        this.api.mostrarMsj = true;
       
        this.editer.emit(false);
        this.sed.emit(data.data);
      });
   }

   agregarArchivo(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
        // Agregar el archivo al formulario
        this.frmGuardar.append(`${numFile}`, inputFile.files[0]);
        
        // Obtener el label asociado y actualizar su texto
        const fileName = inputFile.files[0].name;
        const labelElement = document.getElementById(`labelFile${numFile}`);
        if (labelElement) {
            labelElement.textContent = fileName;
        }
    }
}

}
