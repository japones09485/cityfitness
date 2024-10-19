import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Cliente, Paises } from 'src/app/interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  cliente: Cliente = {};
  frmCli: UntypedFormGroup;
  frmGuardar = new FormData();
  imgCountry: String;
  flagSave = false;
  pathIm = environment.pathImgs;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  pathImg = environment.pathImgs;

  constructor(
    public api: ApiRestService,
    private acRouter: ActivatedRoute,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.api.getCliente(param.id)
        .subscribe((data: any) => {
          this.cliente = data.data;
          this.popularForm();
          this.banderaPais(this.cliente.emp_pais);
          // Buscar pais y traer imagen
        });
    });
    this.inicializarFormulario();

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

  }

  cambioPais() {
    this.banderaPais(this.frmCli.get('emp_pais').value);
  }



  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }


  inicializarFormulario() {
    this.frmCli = this.fb.group({
      emp_nombre: ['', Validators.required],
      emp_nit: ['', Validators.required],
      emp_descripcion: ['', Validators.required],
      emp_pais: ['', Validators.required],
      emp_ciudad: ['', Validators.required],
      emp_telefono: ['', Validators.required],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_facebook: ['', Validators.required],
      emp_instagram: ['', Validators.required],
      emp_vision: ['', Validators.required],
      emp_mision: ['', Validators.required],
      emp_estado: ['', Validators.required]
    });
  }

  popularForm() {
    this.frmCli.patchValue({
      emp_nombre: this.cliente.emp_nombre,
      emp_nit: this.cliente.emp_nit,
      emp_descripcion: this.cliente.emp_descripcion,
      emp_pais: this.cliente.emp_pais,
      emp_ciudad: this.cliente.emp_ciudad,
      emp_facebook: this.cliente.emp_facebook,
      emp_instagram: this.cliente.emp_instagram ,
      emp_vision: this.cliente.emp_vision,
      emp_mision: this.cliente.emp_mision,
      emp_estado: this.cliente.emp_estado,
      emp_email: this.cliente.emp_email,
      emp_telefono: this.cliente.emp_telefono,
    });
  }


  guardarCliente() {
    this.flagSave = true;
    const payload = {
      id_edit: this.cliente.emp_id,
      data: this.frmCli.value
    };

    this.frmGuardar.append('data', JSON.stringify(payload));
    this.api.guardarEditadoCliente(this.frmGuardar)
      .subscribe((data: any) => {
        this.flagSave = false;
        if (data.ok === true) {
          this.cliente = data.data;
          this.api.mensajeUser = 'Editado correctamente';
          this.api.mostrarMsj = true;
        }
      });
  }

  agregarArchivo(ev: any, fileNumber: number) {
    const img: any = ev.target;
    if (img.files.length > 0) {
      this.frmGuardar.append(`${fileNumber}`, img.files[0]);
    }
  }

}
