import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instructor, Curso } from 'src/app/interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-home',
  templateUrl: './cursos-home.component.html',
  styleUrls: ['./cursos-home.component.css']
})
export class CursosHomeComponent implements OnInit {

  listadoCurso: Curso[] = [];
  pathImg = environment.pathImgs;
  viendoclases = false;
  validusuarios  = false;
  msjusuarios= false;
  cursover: Curso;
  gruposDeTarjetas: any[] = [];


  constructor(
    private router: Router,
    public sanitizer: DomSanitizer,
    public api: ApiRestService
  ) {
  }

  ngOnInit(): void {
    this.api.getCursosFront()
      .subscribe((res: any) => {
        this.listadoCurso = res.lista;
      
        
        this.gruposDeTarjetas = this.chunkArray(this.listadoCurso, 5);
        console.log(this.gruposDeTarjetas);
       
      });
  }

  verClases(curso: Curso) {
    this.cursover = curso;
    this.viendoclases = true;
  }

  verMas(id_curso:number){
   
    this.router.navigate(['clasesDetalle/'+id_curso]);

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


  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

}
