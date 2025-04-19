import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { SedesGim } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-sedes-gf',
  templateUrl: './sedes-gf.component.html',
  styleUrl: './sedes-gf.component.css'
})
export class SedesGFComponent implements OnInit{

  fkGIm:number;
  nameGim:string;
  list: SedesGim[] = [];
  pathImg = environment.pathImgs;
  
  constructor(
      public api: ApiRestService,
      private router: Router,
      private acRouter: ActivatedRoute) { }


ngOnInit(): void {

  this.acRouter.params.subscribe(param => {
       this.fkGIm = param.fk_gim;
      this.nameGim = param.gimName
       this.api.getSedesGim(this.fkGIm)
       .subscribe((res:any)=>{
          this.list = res.lista;
         
       });
       
    });

}

verMas(IdSede:number){
 
  this.router.navigate(['sedesInfo/',this.fkGIm,IdSede]);
}

}
