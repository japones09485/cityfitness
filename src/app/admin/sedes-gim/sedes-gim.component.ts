import { Component,OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { SedesGim, Paises, User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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
  frmAddIns: UntypedFormGroup;
  sede: SedesGim;
  fkGim :  number;
  likesView = [];
  frmGuardar = new FormData();
  frmInsGuardar = new FormData();
  editer = false;
  pathIm = environment.pathImgs;
  ImgPaises = environment.pathImgsPaises;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais: String;
  user:User;
  perfilUser : string;
  idUser : number;
  Instructores: any;
  sedeAux : number;
  InstructoresSede: any;

  constructor( public api: ApiRestService,
               private acRouter: ActivatedRoute,
               private fb: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.perfilUser = this.user.usu_perfil;
    this.idUser = this.user.usu_id;
    
    $('#frmSede').on('hidden.bs.modal', (e) => {
      this.frmSede.reset();
    });

    this.initForm();
    this.initFormIns();

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

      this.api.getInstructoresAll()
      .subscribe((res:any)=>{
      
        this.Instructores = res.instructores;
       
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

  initFormIns() {
    this.frmAddIns = this.fb.group({
      instructor: ['', Validators.required],
      tipo: ['', Validators.required]
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

  AgregarIns() {
    
    this.frmInsGuardar.append('data', JSON.stringify(this.frmAddIns.value));
    this.frmInsGuardar.append('sede', JSON.stringify( this.sedeAux ));
    
    this.api.createIns(this.frmInsGuardar)
      .subscribe((data: any) => {

        Swal.fire(data.mensaje);
        this.InstructoresSede=data.instructoresSede;
       
      });
  }



  editarSed(Sede:SedesGim){
    this.sede = Sede;
    this.editer = true;
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

  returnSede(SedeG: SedesGim) {
 
    const updateIt = this.list.find((sed: SedesGim) => sed.sed_id === SedeG.sed_id);
    const index = this.list.indexOf(updateIt);
    this.list[index] = SedeG;
  }

  DeleteSede(idSede:number,sed_fk_gimnasio:number){

    Swal.fire({
      title: "Desea eliminar esta sede?",
      showDenyButton: true,
      confirmButtonText: "SI",
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.api.DeleteSede(idSede,sed_fk_gimnasio)
      .subscribe((data: any) => {
        this.list = data.lista;
        if (result.isConfirmed) {
          Swal.fire(data.mensaje, "", "success");
        } 
        
      });
      } 
    });

  }

  listarInsS(idSede:number){
    this.sedeAux = idSede;
    this.api.listarInsS(idSede)
      .subscribe((data: any) => {
          this.InstructoresSede=data.instructoresSede;
      });
  }

  DeleteInsSede(id:number,instructor:number){
    Swal.fire({
      title: "Desea eliminar este instructor?",
      showDenyButton: true,
      confirmButtonText: "SI",
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.api.DeleteInsSede(id,instructor)
      .subscribe((data: any) => {
        
        if (result.isConfirmed) {
          Swal.fire(data.mensaje, "", "success");
          this.InstructoresSede=data.instructoresSede;
        } 
        
      });
      } 
    });
  }
  

}
 