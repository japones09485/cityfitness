import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Sedes, Paises, RespGimnasios } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  frmGuardar = new FormData();
  list: Sedes[] = [];
  id_sede : number;
  sede:Sedes;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;
  img1F:string;
  img2F:string;
  img3F:string;
  img1 = 'Imagen número 1';
  img2 = 'Imagen número 2';
  img3 = 'Imagen número 3';;
  frmSede: UntypedFormGroup;
  pathIm = environment.pathImgs;

  constructor(public api: ApiRestService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.api.getPaisesList()
    .subscribe((res:any)=>{
      this.paisesList = res.lista
    });

    this.api.getPaises()
    .subscribe((res:any)=>{
      this.paises = res.lista
    });

    this.initForm();

    this.acRouter.params.subscribe(param => {
      this.id_sede = param.idsede;

      if(this.id_sede >0){

        this.api.SedeId(this.id_sede)
        .subscribe((res:any)=>{

          this.sede = res.sede;
          this.img1F = this.sede.sed_foto1;
          this.img2F = this.sede.sed_foto2;
          this.img3F = this.sede.sed_foto3;

          if(this.img1F){
            this.img1 = this.img1F.split('/')[3];
          }

          if(this.img2F){
            this.img2 =  this.img2F.split('/')[3];
          }

          if(this.img3F){
            this.img3 =  this.img3F.split('/')[3];
          }

         this.sede = res.sede;
         this.chargeForm();

        });

      }
    });

  }


  initForm(){
    this.frmSede = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      facebook: [''],
      instagram: [''],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      mapa: ['', Validators.required],
      ruta: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  chargeForm(){

    this.frmSede.patchValue({

      nombre: this.sede.sed_nombre,
      email: this.sede.sed_email,
      telefono: this.sede.sed_telefono,
      facebook: this.sede.sed_facebook,
      instagram: this.sede.sed_instagram,
      direccion: this.sede.sed_direccion,
      pais: this.sede.sed_pais,
      ciudad:this.sede.sed_ciudad,
      mapa: this.sede.sed_mapa,
      ruta: this.sede.sed_ruta,
      estado: this.sede.sed_estado,

    });
  }


  cambioPais() {
    this.banderaPais(this.frmSede.get('pais').value);
  }



  banderaPais(bandera: string) {

    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
    this.imgCountry = flagPais;
   }

  agregarArchivo(ev: any, numFile: number) {
    console.log(ev);

    const imgs: any = ev.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, imgs.files[0]);
    }
  }

  crearSede(){
    this.frmGuardar.append('data', JSON.stringify(this.frmSede.value));
    this.frmGuardar.append('id_sede', JSON.stringify(this.id_sede));

    this.api.createSed(this.frmGuardar)
      .subscribe((data: any) => {
        Swal.fire(data.mensaje);
        if(data.ok==true){
          this.router.navigate( ['/admin/sedes/'] );
        }


      });

  }

}
