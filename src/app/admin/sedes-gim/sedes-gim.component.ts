import { Component,OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { SedesGim, Paises, RespGimnasios } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var $: any;


@Component({
  selector: 'app-sedes-gim',
  templateUrl: './sedes-gim.component.html',
  styleUrl: './sedes-gim.component.css'
})
export class SedesGimComponent implements OnInit{

  $: any;
  list: SedesGim[] = [];
  frmSede: UntypedFormGroup;
  gimnasio: SedesGim;
  fkGim :  number;
  likesView = [];
  frmGuardar = new FormData();
  editer = false;
  pathIm = environment.pathImgs;
  ImgPaises = environment.pathImgsPaises;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais: String;



  constructor( public api: ApiRestService,
               private acRouter: ActivatedRoute,
               private fb: UntypedFormBuilder) { }

  ngOnInit(): void {

  

    $('#frmSede').on('hidden.bs.modal', (e) => {
      this.frmSede.reset();
    });

    this.initForm();
    this.acRouter.params.subscribe(param => {
      this.fkGim = param.fk_gim;
      this.api.getSedesGim(this.fkGim)
      .subscribe((res:any) => {
        this.list = res.lista;
        
      });
    });

    this.api.getPaisesList()
      .subscribe((res: any) => {
        this.paisesList = res.lista;
      });

    this.api.getPaises()
      .subscribe((res: any) => {
        this.paises = res.lista;
      });
    
   
  }

  initForm() {
    this.frmSede = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      mapa: ['', Validators.required],
      ruta: ['', Validators.required],
      servicios: ['', Validators.required],
      horarios: ['', Validators.required],
      precio_m: ['', Validators.required],
      link_mes: ['', Validators.required],
      precio_t: ['', Validators.required],
      link_tri: ['', Validators.required],
      precio_sm: ['', Validators.required],
      link_sem: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  crearSede() {
    this.frmGuardar.append('data', JSON.stringify(this.frmSede.value));
    this.frmGuardar.append('fkGim', JSON.stringify( this.fkGim ));
    this.api.createSedeGym(this.frmGuardar)
      .subscribe((data: any) => {
        this.list=data.lista;
        this.frmSede.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
        $('#frmSede').modal('hide');
      });
  }



  editarSed(Sede:SedesGim){

  }


  loadLikes(likes){

  }

  cambioPais() {
    this.banderaPais(this.frmSede.get('pais').value);
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm + 'imagenes/paises/' + infopais;
    this.imgCountry = flagPais;
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

  banderaSede(bandera: string) {
    const country = this.paisesList.find(pais => pais.iso === bandera); 
    
    return this.ImgPaises+'/'+country.flag;
  }

  

}
 