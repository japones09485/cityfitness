import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AliadosService } from '../../../../services/aliados.service';
import { AuthService } from '../../../../services/auth.service';
import { info_detalle,detalle_preg } from 'src/app/interfaces/interfaces';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  id_presentacion :number;
  info:info_detalle;
  detalle:detalle_preg;
  alumno :string;
  nomexamen:string;
  nota: number;
  cuantitativa: string;

  constructor(private apiAlid: AliadosService,
    private authApi:AuthService,
    private router:Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {
      this.id_presentacion = param.presentacion;

          this.apiAlid.verResultado(this.id_presentacion)
          .subscribe((res: any) => {

           this.info = res.info[0];
           this.detalle = res.preguntas;
           this.alumno = this.info.alumno;
           this.nomexamen = this.info.examen;
           this.nota = this.info.nota;
           this.cuantitativa = this.info.cuantitativa
          });

    });




  }

  descargarArchivo(){
    let DATA: any = document.getElementById('tableinfo');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 200;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.alumno+'.pdf');
    });
  }



}
