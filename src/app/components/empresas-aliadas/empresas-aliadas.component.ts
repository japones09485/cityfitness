import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instructor, Curso } from 'src/app/interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-empresas-aliadas',
  templateUrl: './empresas-aliadas.component.html',
  styleUrls: ['./empresas-aliadas.component.css']
})
export class EmpresasAliadasComponent implements OnInit {

  listadoCurso: Curso[] = [];
  pathImg = environment.pathImgs;
  viendoclases = false;
  cursover: Curso;

  constructor(
    public api: ApiRestService
  ) {
  }

  ngOnInit(): void {
    this.api.getEmpresasAliadas()
      .subscribe((res: any) => {
        this.listadoCurso = res.lista;
        console.log(this.listadoCurso);
        
      });
  }

  verClases(curso: Curso) {
    this.cursover = curso;
    this.viendoclases = true;
  }

}

