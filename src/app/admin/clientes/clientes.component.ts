import { Component, OnInit } from '@angular/core';
import { Cliente, Paises, RespuestaClientes, RespuestaCrear } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listado: Cliente[] = [];
  pagMostrar = 1;
  cantidadPaginas = 0;
  creando = false;
  frmCliCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  private _flagSave = false;
  public get flagSave() {
    return this._flagSave;
  }
  public set flagSave(value) {
    this._flagSave = value;
  }
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  pathIm = environment.pathImgs;
  nombrePais:String;

  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder) {

  }

  ngOnInit(): void {

    this.getListado();
    this.inicializarForm();

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });


  }

  inicializarForm() {
    this.frmCliCreator = this.fb.group({
      emp_nombre: ['', Validators.required],
      emp_nit: ['', Validators.required],
      emp_descripcion: ['', Validators.required],
      emp_pais: ['', Validators.required],
      emp_ciudad: ['', Validators.required],
      emp_vision: ['', Validators.required],
      emp_mision: ['', Validators.required],
      emp_estado: ['', Validators.required],
      emp_telefono: ['', Validators.required],
      emp_email: ['', Validators.required],
      emp_facebook: ['', Validators.required],
      emp_instagram: ['', Validators.required],
    });
  }

  private getListado() {
    this.api.getClientes(this.pagMostrar)
      .subscribe((data: RespuestaClientes) => {
     
        this.listado = data.lista;
        this.cantidadPaginas = data.cant_paginas;
      });
  }

  obtenerPagina(pagina: number) {
    this.pagMostrar = pagina;
    this.getListado();
  }

  pags(): any[] {
    return Array(this.cantidadPaginas);
  }

  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]);
    }
  }

  crearCliente() {
    this.flagSave = true;
    this.frmGuardar.append('data', JSON.stringify(this.frmCliCreator.value));
    this.api.guardarCliente(this.frmGuardar)
      .subscribe((data: RespuestaCrear) => {
        this.listado.unshift(data.data);
        this.flagSave = false;
        this.creando = false;
        this.frmCliCreator.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
      });
  }

  cambioPais() {
    this.banderaPais(this.frmCliCreator.get('emp_pais').value);
  }

  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }


  getImageCountry(codigo: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code == codigo);
    this.imgCountry = country.flag;
  }

  banderaInstructor(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  eliminarCliente(cliente:number){
    Swal.fire({
      title: 'Mensaje de usuario',
      text:  'Desea eliminar este empresa?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarCliente(cliente)
    .subscribe((res:any) =>{
      console.log(res);

      this.listado = res.lista;
    })
      }
    })
  }
}
