import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Gimnasio, Paises, RespGimnasios } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-gimnasios',
  templateUrl: './gimnasios.component.html',
  styleUrls: ['./gimnasios.component.css']
})
export class GimnasiosComponent implements OnInit {

  $: any;
  list: Gimnasio[] = [];
  frmGimnasio: UntypedFormGroup;
  gimnasio: Gimnasio;
  likesView = [];
  frmGuardar = new FormData();
  editer = false;
  pathIm = environment.pathImgs;
  ImgPaises = environment.pathImgsPaises;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais: String;

  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    $('#frmGimnasio').on('hidden.bs.modal', (e) => {
      this.frmGimnasio.reset();
    });
    this.listGimnasios();
    this.api.getPaisesList()
      .subscribe((res: any) => {
        this.paisesList = res.lista;
      });

    this.api.getPaises()
      .subscribe((res: any) => {
        this.paises = res.lista;
      });
  }

  cambioPais() {
    this.banderaPais(this.frmGimnasio.get('pais').value);
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm + 'imagenes/paises/' + infopais;
    this.imgCountry = flagPais;
  }

  listGimnasios() {
    this.api.getAllGimnasios()
      .subscribe((res: RespGimnasios) => {
        this.list = res.lista;
      });
  }

  initForm() {
    this.frmGimnasio = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      mapa: ['', Validators.required],
      ruta: ['', Validators.required],
      tipo_gimnasio: ['', Validators.required]
    });
  }

  crearGimnasio() {
    this.frmGuardar.append('data', JSON.stringify(this.frmGimnasio.value));
    this.api.createGym(this.frmGuardar)
      .subscribe((data: any) => {
        this.list.unshift(data.data);
        this.frmGimnasio.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
        $('#frmGimnasio').modal('hide');
      });
  }

  editarGym(gim: Gimnasio) {
    this.gimnasio = gim;
    this.editer = true;
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

  returnGym(gimnasio: Gimnasio) {
    const updateIt = this.list.find((gim: Gimnasio) => gim.gim_id === gimnasio.gim_id);
    const index = this.list.indexOf(updateIt);
    this.list[index] = gimnasio;
  }

  banderaGimnasio(bandera: string) {
    const country = this.paisesList.find(pais => pais.iso === bandera); 
    
    return this.ImgPaises+'/'+country.flag;
  }

  loadLikes(likes) {
    console.log(likes);
    this.likesView = likes;
  }
}
