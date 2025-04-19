import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { SedesGim } from 'src/app/interfaces/interfaces';




@Component({
  selector: 'app-info-sede',
  templateUrl: './info-sede.component.html',
  styleUrl: './info-sede.component.css'
})
export class InfoSedeComponent implements OnInit{

  IdSede:number;
  sede:SedesGim;
  fkGim:number;
  clasesSede:any;
  pathImg = environment.pathImgs;
  baseUrl = environment.baseUrl;
  clasesPorDia:any;
  Instructores: any;
 

  constructor(
          public api: ApiRestService,
          private router: Router,
          private acRouter: ActivatedRoute) { }
    
    
  ngOnInit(): void {
      
    
    this.acRouter.params.subscribe(param=>{
      
      this.IdSede = param.IdSede
      this.fkGim = param.fk_gim

      this.api.SedeIdGim(this.IdSede).
      subscribe((res:any)=>{
      
        this.sede = res.sede;
     console.log(this.sede);
     
      
      });
      
      this.api.getSedesClase(this.fkGim,this.IdSede)
      .subscribe((res:any)=>{

        this.clasesSede = res.lista;

        this.clasesPorDia = {
          Lunes: [],
          Martes: [],
          Miércoles: [],
          Jueves: [],
          Viernes: [],
          Sábado: [],
          Domingo: []
        };
        
        // Recorremos el arreglo original y clasificamos las clases
        this.clasesSede.forEach(clase => {
          switch (clase.clas_dia) {
            case "1": this.clasesPorDia.Lunes.push(clase); break;
            case "2": this.clasesPorDia.Martes.push(clase); break;
            case "3": this.clasesPorDia.Miércoles.push(clase); break;
            case "4": this.clasesPorDia.Jueves.push(clase); break;
            case "5": this.clasesPorDia.Viernes.push(clase); break;
            case "6": this.clasesPorDia.Sábado.push(clase); break;
            case "7": this.clasesPorDia.Domingo.push(clase); break;
          }
        });
        
         
            
        
      });

      this.api.listarInsS(this.IdSede)
      .subscribe((data: any) => {
       
        this.Instructores = data.instructoresSede;
       
       
      });

    });

  }


  nameInstructor(idIns:number) {
   
    const instructor = this.Instructores.find(ins => ins.ins_id === idIns);
   
    return instructor.nombre_completo;
}
  
}
