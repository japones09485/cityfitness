import { Component } from '@angular/core';
import {User,Paises,RespuestaPaises} from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AliadosService } from '../../services/aliados.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService} from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-intructor-page',
  templateUrl: './intructor-page.component.html',
  styleUrls: ['./intructor-page.component.css']
})
export class IntructorPageComponent {
  instructor:any;
  pathIm = environment.pathImgs;
  paises: Paises[] = [];
  nombrePais:String;
  nombrePersona:String;
  descripcionp:String
  foto1:String;
  certificaciones:any;

  constructor(private acRouter: ActivatedRoute,
    public api: ApiRestService) { }

    ngOnInit(): void {

      this.acRouter.params.subscribe(param => {
        this.api.getInstructor(param.idIns)
        .subscribe((res:any)=>{
          console.log(res.certificaciones);

           this.instructor = res.data
           this.nombrePersona = this.instructor.ins_nombre+' '+this.instructor.ins_apellido
           this.foto1 =   this.pathIm+this.instructor.ins_foto1;
           this.descripcionp = this.instructor.ins_descrp_profesional;
           this.certificaciones = res.certificaciones;


          })
      });

    }

    banderaInstructor(bandera: string) {
      const country = this.api.paises.find(pais => pais.alpha3Code === bandera);
      return country.flag;
    }

    banderaPais(bandera: string) {
      let infopais = this.paises[bandera].flag;
      this.nombrePais = this.paises[bandera].nombre;
      const flagPais = this.pathIm +'imagenes/paises/'+ infopais;
       return flagPais;
     }

     downloadDoc(urlDocumento: string) {
      if(urlDocumento){
        urlDocumento = this.pathIm + urlDocumento;
        window.open(urlDocumento, '_blank');
      }else{
        Swal.fire('No hay documento cargado.');
      }

    }


}
