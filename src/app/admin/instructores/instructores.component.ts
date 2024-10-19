import { Component, OnInit } from '@angular/core';
import { Instructor, RespInstructor, Cliente, Curso, RespCursos, Gimnasio, RespGimnasios, Like, Paises, Carreras } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AliadosService } from 'src/app/services/aliados.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode-generator';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent implements OnInit {

  creando = false;
  listado: Instructor[] = [];
  cantidadPaginas = 0;
  pagMostrar = 0;
  empresas: Cliente[] = [];
  frmInsCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave = false;
  pathIm = environment.pathImgs;
  cursados: Curso[] = [];
  cursosInstructor: Curso[] = [];
  selectEmpresa: UntypedFormGroup;
  copySelect: Curso[] = [];
  gimnasios: Gimnasio[] = [];
  listGims: Gimnasio[] = [];
  likesView: Like[] = [];
  nombrePais:String;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  url: string;
  qrCodeData: string;
  qrCodeImage: string;
  validIns = false;
  Instructor: any;
  mailInstructor: any;
  mailY: string;
  inst:number;
  carrerasAliado: Carreras[] = [];
  carrerasDisponible: Carreras[] = [];
  totalAliado:number;
  frmCarrera: UntypedFormGroup;

  filts = {
    nameSearch: '',
    apellisearch: ''
  };

  constructor(
    public api: ApiRestService,
    public apiAlid: AliadosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.initFormCarreras();

    this.Instructor = JSON.parse(sessionStorage.getItem('instructor'));
    if (this.Instructor !== null && this.Instructor.ins_id) {
      this.validIns = true;
    }

    this.acRouter.params.subscribe(param => {
      this.inst = param.inst;
      if(this.inst == 1){
        
          this.mailY = param.EmailInstr;
         
          this.api.getInstructoresEmail(this.mailY)
          .subscribe((data: any) => {

            this.validIns = true;
            if(data.success){
              //this.usuarios = data.lista;
              //this.incializarForm();
              this.listado = data.lista;
              this.cantidadPaginas = 1;

              
            }
            //se debe validar con  this.validInst , el boton creart usuario debe llevar a user enviado como parametro el mail , debe quedar con el mismo

          });
      }else{
        this.api.listadoCursosInstructorAdmin()
              .subscribe((res: RespCursos) => {
                this.cursosInstructor = res.lista;
              });
            this.api.getAllGimnasios()
              .subscribe((res: RespGimnasios) => {
                this.gimnasios = res.lista;
              });
        
            this.getListado();
            this.api.getAllEmpresas().subscribe((data: any) => { this.empresas = data.lista; });
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
       
        
    });

  }

  private getListado() {
    this.api.getInstructores(this.pagMostrar)
      .subscribe((data: RespInstructor) => {
        this.listado = data.lista;
        this.cantidadPaginas = data.cant_pag;
      });
  }

  cambioPais() {
    this.banderaPais(this.frmInsCreator.get('ins_fk_pais').value);
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }


  inicializarForm() {
    this.selectEmpresa = this.fb.group({
      empSelect: [''],
      curEmpSelect: ['']
    });
    this.frmInsCreator = this.fb.group({
      ins_identificacion: ['', [Validators.required]],
      ins_nombre: ['', Validators.required],
      ins_apellido: ['', Validators.required],
      ins_descrp_profesional: ['', Validators.required],
      ins_correo: ['', [Validators.required, Validators.email]],
      ins_facebook: ['', Validators.required],
      ins_instagram: ['', Validators.required],
      ins_estado: ['', Validators.required],
      ins_telefono: ['', Validators.required],
      ins_fk_pais: ['', Validators.required],
      ins_fk_ciudad: ['', Validators.required],
      ins_fk_empresa: ['', Validators.required],
      ins_fk_perfil: ['', Validators.required],
    });
  }

  pags(): any[] {
    return Array(this.cantidadPaginas);
  }
  obtenerPagina(pagina: number) {
    this.pagMostrar = pagina;
    this.getListado();
  }

  downloadQRCode(data: string,name : string) {


    const qr = QRCode(0, 'H');
    var url = 'https://www.cityfitnessworld.com/#/InstructorPage/'+data;
    qr.addData(url);
    qr.make();

    const scaleFactor = 6; // Aumenta el tamaño del código QR multiplicando el tamaño de cada celda

    const qrCodeSize = qr.getModuleCount(); // Obtiene el tamaño del código QR original
    const enlargedQRCodeSize = qrCodeSize * scaleFactor; // Calcula el nuevo tamaño aumentado

    const canvas = document.createElement('canvas');
    canvas.width = enlargedQRCodeSize;
    canvas.height = enlargedQRCodeSize;

    const context = canvas.getContext('2d');

    // Dibuja el código QR aumentado en el lienzo del canvas
    for (let row = 0; row < qrCodeSize; row++) {
      for (let col = 0; col < qrCodeSize; col++) {
        const isDark = qr.isDark(row, col);
        const x = col * scaleFactor;
        const y = row * scaleFactor;
        context.fillStyle = isDark ? '#000000' : '#ffffff';
        context.fillRect(x, y, scaleFactor, scaleFactor);
      }
    }

    // Crea un enlace temporal para descargar la imagen del código QR
    const link = document.createElement('a');
    link.href = canvas.toDataURL('www.youtube.com');
    var namearch = name+'.png';
    link.download = namearch;
    link.click();
  }

  crearInstructor() {

    this.frmInsCreator.value.cursos = this.cursados;
    this.frmInsCreator.value.gimnasios = this.listGims;
    this.frmGuardar.append('data', JSON.stringify(this.frmInsCreator.value));
    this.api.guardarInstructor(this.frmGuardar)
      .subscribe((data: any) => {
        if(data.ok == true){
          this.flagSave = true;
        this.listado.unshift(data.data);
        this.flagSave = false;
        this.creando = false;
        this.frmInsCreator.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
        }else{

          Swal.fire(
            'Mensaje de usuario!',
            'Email proporcionado ya se encuentra registrado!',
            'success'
          )

        }

      });
  }

  agregarArchivo(ev: any, numFile: number) {

    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }

  banderaInstructor(bandera: string) {
    const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

  agregarCursados() {


    const slcIdx = this.selectEmpresa.value.curEmpSelect;
    const cur = this.cursosInstructor.find(cr => cr.cur_id === slcIdx);
    if (this.cursados.find(cr => cr.cur_id === cur.cur_id)) {
      return;
    } else {
      this.cursados.push(cur);
    }

  }

  quitarCursado(curQuit: any) {
    this.cursosInstructor.push(curQuit);
    this.cursados = this.cursados.filter(cr => cr.cur_id !== curQuit.cur_id);
  }

  cargarCursos() {
    const idEmp = this.selectEmpresa.value.empSelect;


    const filterEmpresa = this.cursosInstructor.filter(cr => cr.cur_fk_empresa === idEmp);
    this.copySelect = filterEmpresa.filter(cr => {
      if (!this.cursados.find(crI => crI.cur_id === cr.cur_id)) {
        return cr;
      }
    });
  }

  changeGym(ev: any){
    if (ev.target.value === ''){
      return;
    }
    const gimAdd = this.gimnasios.find( gm => gm.gim_id === ev.target.value);
    this.listGims.push(gimAdd);
  }

  quitGym(gym: Gimnasio){
    this.listGims = this.listGims.filter(gm => gm.gim_id !== gym.gim_id);
  }

  loadLikes(likes: Like[]){
    this.likesView = likes;
  }

  buscarInstruc() {
    this.api.buscarInstructor(this.filts)
      .subscribe((res: RespInstructor) => {
        if (res.ok == true) {
          this.listado = res.lista;
        }
      });

  }

  eliminarInstructor(id_inst){
    Swal.fire({
      title: "Desea eliminar el instructor seleccionado?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.api.eliminarInstructor(id_inst)
        .subscribe((res: any) => {
          if (res.ok == true) {
            this.listado = res.lista;
            Swal.fire(res.mensaje);
          }
        });


      }
    });

  }

  Certificacion(idAliado:number){
    this.router.navigate(['/aliado/certificacion/' + idAliado]);
  }

  initFormCarreras() {
    this.frmCarrera = this.fb.group({
      carreraEle: ['', Validators.required],
     
    });
  }

  traer_carreras(id_aliado){
    //traemos las carreras

    this.apiAlid.listarCarrerasActi(id_aliado)
    .subscribe((res:any)=>{
    
     this.carrerasDisponible = res.carrerasDisponibles;
     this.carrerasAliado = res.carrerasAliado; 
     this.totalAliado = res.totalAliado;
      
    });
  }

  AgregarCarrera(idAliado){
    this.frmGuardar.append('data', JSON.stringify(this.frmCarrera.value));
    this.frmGuardar.append('idAliado', JSON.stringify(idAliado));

    this.apiAlid.AgregarCarrera(this.frmGuardar)
    .subscribe((res: any) => {
      Swal.fire(res.mensaje);
      this.carrerasAliado = res.carrerasAliado;
      this.carrerasDisponible = res.carrerasDisponibles;
      this.totalAliado = res.totalAliado;
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    });

  }

  eliminarCarreraAlid(idAliado,idCarrera){
    Swal.fire({
      title: "Desea eliminar esta carrera?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.apiAlid.eliminarCarreraAlid(idAliado,idCarrera)
        .subscribe((res:any)=>{
        
         this.carrerasDisponible = res.carrerasDisponibles;
         this.carrerasAliado = res.carrerasAliado; 
         this.totalAliado = res.totalAliado;
          
        });

      }
    });

  }
}
