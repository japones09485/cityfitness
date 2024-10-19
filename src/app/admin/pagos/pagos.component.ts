import { Component, OnInit } from '@angular/core';
import { Pago, ResultPagos,Socios,Emp_socio,AlumnosInscritos } from 'src/app/interfaces/interfaces';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiRestService } from 'src/app/services/api-rest.service';


declare var $: any;




@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  frmClasCreator: UntypedFormGroup;
  socios: Socios[] = [];
  empresas: Emp_socio[] = [];
  sucess:boolean;
  paginas = 0;
  mensaje :string;
  idsocio :number;
  AlumnosInscritos : AlumnosInscritos;
  DataCsv:any = [];

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiRestService
  ) { }

  ngOnInit(): void {

     this.api.getSocios()
    .subscribe((res:any)=>{
      this.socios = res.lista;
    });

    this.initForm();

    $('#fechaInicio').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fechaini: e.target.value
        });
      }
    });

    $('#fechaFin').datepicker({
      uiLibrary: 'bootstrap4',
      locale: 'es-es',
      format: 'yyyy-mm-dd',
      modal: true,
      header: true,
      footer: true,
      change: (e) => {
        this.frmClasCreator.patchValue({
          fechafn: e.target.value
        });
      }
    });


  }

  initForm(){
    this.frmClasCreator = this.fb.group({
      socio: ['', Validators.required],
      empresa: ['', Validators.required],
      fechaini: ['', Validators.required],
      fechafn: ['', Validators.required]
    });
  }

  obtenerEmpresa(){
    this.api.traeraliadosXsocio(this.idsocio)
    .subscribe((res:any)=>{
    this.empresas = res.empresas;
    });
  }


  Generar_informe(){

    this.api.generarInforme(this.frmClasCreator.value)
    .subscribe((res:any)=>{
      if(res.ok==true){
        this.DataCsv = res.data;
        let cabecera = ['Socio', 'Empresa','Aliado', 'Alumno','Correo','Fecha_Inicio', 'Fecha_Fin'];
        this.downloadFile(this.DataCsv,cabecera,'Informe alumnos');
          this.downloadFile(this.DataCsv,cabecera,'Informe alumnos');
          this.sucess = true;
          this.mensaje = 'Informe descargado exitosamente';
          setTimeout(() => {
            this.sucess = false;
            this.frmClasCreator.reset();
          }, 4000 );

      }else{
        this.sucess = true;
        this.mensaje = 'No hay resultados disponibles.';
        setTimeout(() => {
          this.sucess = false;
        }, 4000 );
      }
    });

  }

  public downloadFile(data:unknown, columnHeaders:string[], filename = 'data') {
    let csvData = this.ConvertToCSV(data, columnHeaders);

    let blob = new Blob(['' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray:any, headerList:string[]) {


    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    let str = '';
    let row:string = '';

    for (let index in headerList) {
      row += headerList[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + ' \n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        line += array[i][head] + ';';
      }
      str += line + '\n';
    }

    return str;
  }






}
