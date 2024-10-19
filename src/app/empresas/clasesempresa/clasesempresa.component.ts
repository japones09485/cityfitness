import { Component, OnInit,Input} from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';   
import { AliadosService } from '../../services/aliados.service';
import {AuthService } from '../../services/auth.service';
import { User, ClaAliad } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-clasesempresa',
  templateUrl: './clasesempresa.component.html',
  styleUrls: ['./clasesempresa.component.css']
})
export class ClasesempresaComponent implements OnInit {
  id_usuario:number;
  idAlid:number;
  clases: ClaAliad[] = [];
  cantPaginas:number;
  id_empresa:number;
  constructor(private fb: UntypedFormBuilder,
    private apiAlid:AliadosService,
    private authApi:AuthService,
    private router: Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
     
    }); 
    
    this.listarClasesAlid(this.id_empresa,1);
  }

  listarClasesAlid(id:number,pagina:number){
    return this.apiAlid.listarClasesAlid(id,pagina)
         .subscribe((res: any)=>{
         this.clases = res.data;
         this.cantPaginas = res.cant_pag;
         });
   }

   editClase(id){
    this.router.navigate( ['adminAlid/editclase',id] );
}


estadoClase( id_clase: number , estado:number ){
 return this.apiAlid.EstadoClase(id_clase, estado)
     .subscribe((res: any)=>{
      this.clases.forEach(element => {
        if(element.claA_id == id_clase){
         element.calA_estado = estado
        }
      });    
     });
}

sigPag(pagina:number){

 this.apiAlid.listarClasesAlid(this.idAlid,pagina)
 .subscribe((res: any)=>{
   this.clases = res.data;    
 });
}

}
