import { Component, OnInit } from '@angular/core';
import { Instructor, Cliente, Curso, RespCursos, Gimnasio, RespGimnasios, Paises } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-instructor',
  templateUrl: './editar-instructor.component.html',
  styleUrls: ['./editar-instructor.component.css']
})
export class EditarInstructorComponent implements OnInit {

  instructor: Instructor = {};
  frmIns: UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave = false;
  pathIm = environment.pathImgs;
  creando = false;
  empresas: Cliente[] = [];
  cursados: Curso[] = [];
  cursosInstructor: Curso[] = [];
  cursosInstructorAlid: Curso[] = [];
  gimnasios: Gimnasio[] = [];
  listGim: Gimnasio[] = [];
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  selectEmpresa: UntypedFormGroup; // Empresa para los cursos del instructor
  copySelect: Curso[] = []; // copia de cursos para mostrar en select
  externo = 0;
  
  constructor(
    public api: ApiRestService,
    private acRouter: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {

    this.api.listadoCursosInstructorAdmin()
      .subscribe((res: RespCursos) => {
        this.cursosInstructor = res.lista;
      });

    this.api.getAllEmpresas().subscribe((data: any) => { this.empresas = data.lista; });

    this.acRouter.params.subscribe(param => {
      new Promise(async (resolve, reject) => {
        resolve(this.api.listadoCursosInstructor()
          .subscribe((res: RespCursos) => {
            this.cursosInstructorAlid = res.lista;

          }));
      }).then(() => {
        this.api.getCursosInstructor(param.id)
          .subscribe((dt: any) => {
            if (dt.cursos.length > 0) {
              this.cursados = dt.cursos;
            }
            if(dt.gimnasios.length > 0){
              this.listGim = dt.gimnasios;
            }
            if (this.cursados.length > 0) {

              this.cursosInstructor = this.cursosInstructor.filter(curIs => {
                const crBs = this.cursados.find(cr => cr.cur_id === curIs.cur_id);
                if (!crBs) {
                  return curIs;
                }
              });
            }
          });
      });
      this.api.getInstructor(param.id)
        .subscribe((data: any) => {
          this.instructor = data.data;
          this.banderaPais(this.instructor.ins_fk_pais);
          this.popularForm();

        });
      this.api.getAllGimnasios()
        .subscribe( (data: RespGimnasios) =>{
          this.gimnasios = data.lista;
        });

        this.externo = param.externo;

        if (this.externo <= 1) {
          // Deshabilitar los controles con la clase 'validEdit'
          const elements = document.querySelectorAll('.validEdit');
          elements.forEach((element: any) => {
              element.disabled = true;
          });
      }
        
        
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


  

  inicializarFormulario() {
    this.selectEmpresa = this.fb.group({
      empSelect: [''],
      curEmpSelect: ['']
    });
    this.frmIns = this.fb.group({
      ins_identificacion: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_nombre: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_apellido: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_fk_empresa: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_descrp_profesional: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_fk_perfil: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_correo: ['', [Validators.required, Validators.email]],
      ins_facebook: ['', Validators.required],
      ins_instagram: ['', Validators.required],
      ins_estado: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_telefono: [{ value: '', disabled: this.externo <= 1 }, Validators.required],
      ins_fk_pais: ['', Validators.required],
      ins_fk_ciudad: ['', Validators.required],
    });
  }

  popularForm() {
    this.frmIns.patchValue({
      ins_identificacion: this.instructor.ins_identificacion,
      ins_nombre: this.instructor.ins_nombre,
      ins_apellido: this.instructor.ins_apellido,
      ins_fk_empresa: this.instructor.ins_fk_empresa,
      ins_descrp_profesional: this.instructor.ins_descrp_profesional,
      ins_fk_perfil: this.instructor.ins_fk_perfil,
      ins_correo: this.instructor.ins_correo,
      ins_facebook: this.instructor.ins_facebook,
      ins_instagram: this.instructor.ins_instagram,
      ins_estado: this.instructor.ins_estado,
      ins_telefono: this.instructor.ins_telefono,
      ins_fk_pais: this.instructor.ins_fk_pais,
      ins_fk_ciudad: this.instructor.ins_fk_ciudad,
    });
  }

  guardarInstructor() {
    this.flagSave = true;
    this.frmIns.value.cursos = this.cursados;
    this.frmIns.value.gimnasios = this.listGim;
    const payload = {
      id_edit: this.instructor.ins_id,
      data: this.frmIns.value
    };
    this.frmGuardar.append('data', JSON.stringify(payload));
    this.api.guardarEditadoInstructor(this.frmGuardar)
      .subscribe((data: any) => {
        this.flagSave = false;
        if (data.ok === true) {
          this.instructor = data.data;
          console.log(this.instructor);
          
          this.api.mensajeUser = 'Editado correctamente';
          this.api.mostrarMsj = true;
          setTimeout(() => {
            this.router.navigate(['admin/instructorY/1/' + this.instructor.ins_correo]);
          }, 2000);
        }
      });
  }

  agregarArchivo(ev: any, numFile: number) {
    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
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
    this.listGim.push(gimAdd);
  }

  quitGym(gym: Gimnasio){
    this.listGim = this.listGim.filter(gm => gm.gim_id !== gym.gim_id);
  }

  cambioPais() {

    this.banderaPais(this.frmIns.get('ins_fk_pais').value);
  }

  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

}
