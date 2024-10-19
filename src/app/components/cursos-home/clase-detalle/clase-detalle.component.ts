import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instructor, Curso, Clase } from 'src/app/interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.css']
})
export class ClaseDetalleComponent implements OnInit {

  clases: Clase[] = [];
  pathImg = environment.pathImgs;
  viendoclases = false;
  validusuarios  = false;
  msjusuarios= false;
  curso: Curso;

  constructor(
    public sanitizer: DomSanitizer,
    public api: ApiRestService,
    private acRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {


    this.acRouter.params.subscribe(param => {


       this.api.cursosClases(param.idCurso)
      .subscribe((res: any) => {
        this.curso = res.curso;
        this.clases = res.clases;
        console.log(this.clases);

      });

    });

  }




  verClasesusuarios(perfil:number,curso: number){

this.api.getUsuarios(perfil,curso)
 .subscribe((res: any)=>{

  if(res.ok){
    this.validusuarios = true;
  }else{
    this.msjusuarios = true;
  }
 });


  }


}
