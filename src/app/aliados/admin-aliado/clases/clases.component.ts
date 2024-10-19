import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';   
import { AliadosService } from '../../../services/aliados.service';
import {AuthService } from '../../../services/auth.service';
import { User, ClaAliad } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  clases: ClaAliad[] = [];
  cantPaginas:number;
  user: User;
  idAlid:number;
  activar: boolean;
 
  constructor( private fb: UntypedFormBuilder,
               private apiAlid:AliadosService,
               private authApi:AuthService,
               private router:Router){ }

  ngOnInit(): void {
    this.activar = false;
    this.user = this.authApi.getUser();
    this.idAlid = this.user.usu_id;
    this.listarClasesAlid(this.idAlid,1);
  }
  
  editClase(id){
       this.router.navigate( ['adminAlid/editclase',id] );
  }

  listarClasesAlid(id:number,pagina:number){
   return this.apiAlid.listarClasesAlid(id,pagina)
        .subscribe((res: any)=>{
        this.clases = res.data;
        this.cantPaginas = res.cant_pag;
        });
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
                           