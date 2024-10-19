import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Sedes, Paises, RespuestaPaises } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  $: any;
  list: Sedes[] = [];
  frmSede: UntypedFormGroup;
  sede: Sedes;
  frmGuardar = new FormData();
  pathIm = environment.pathImgs;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais:String;

  constructor(public api: ApiRestService,
    private fb: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.api.getSedesFront()
    .subscribe((res:any)=>{
     this.list = res.lista;
    });

    this.api.getPaises()
      .subscribe((res:RespuestaPaises)=>{
        this.paises = res.lista
      });


  }





  CrearSed(){
    this.router.navigate( ['admin/sede/',0] );
  }

  EliminarSed(idSede:number){
    Swal.fire({
      title: 'Mensaje de usuario',
      html:
      'Desea eliminar sede?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.api.deleteSede(idSede)
       .subscribe((res:any)=>{
        this.list = res.sedes
        Swal.fire('Sede eliminada exitosamente')

       });
      }
    })
  }


  EditSed(sede){
    this.router.navigate( ['admin/sede/',sede] );
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
     return flagPais;
   }

}
