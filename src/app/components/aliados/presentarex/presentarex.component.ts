import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User, Examen, Pregunta, Respuesta } from '../../../interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import { AuthService } from '../../../services/auth.service';
import { intervalToDuration } from 'date-fns';
@Component({
  selector: 'app-presentarex',
  templateUrl: './presentarex.component.html',
  styleUrls: ['./presentarex.component.css']
})
export class PresentarexComponent implements OnInit {

  id_empresa: number;
  id_examen: number;
  numpreg: number;
  frmClasCreator: UntypedFormGroup;
  frmGuardar = new FormData();
  examen: Examen;
  mensaje: string;
  sucess: boolean;
  user: User;
  idExamen: number;
  arrnumpreg = [];
  preguntas: Pregunta[] = [];
  respuestas: Respuesta[] = [];
  msjintro: number;
  nombreExamen: String;
  nombreDescrip: String;
  inicioExamen: boolean;
  presentacion : any;
  valitiempo: boolean;
  duracionF: number;
  validboton=true;
  mostrar_info = false;
  id_prese : number;
  duracion : number;
  validtime = true;
  hourfalt:number;
  minfalt:number;
  segfalt:number;
  myInterval:any;


  constructor(private fb: UntypedFormBuilder,
    private apiAlid: AliadosService,
    private authApi: AuthService,
    private router: Router,
    private acRouter: ActivatedRoute) { }


  ngOnInit(): void {

    this.user = this.authApi.getUser();
    this.acRouter.params.subscribe(param => {

      this.id_examen = param.idexamen;
      this.id_empresa = param.id_empresa;

      this.apiAlid.ExamenId(this.id_examen)
        .subscribe((res: any) => {
          this.examen = res.examen;
          this.idExamen = this.examen.id_examen;
          this.numpreg = this.examen.numero_preguntas;
          this.nombreExamen = this.examen.nombre;
          this.nombreDescrip = this.examen.descripcion;
          this.msjintro = this.examen.duracion;

          const infoPres = {
            alumno: this.user.usu_id,
            idexamen: this.idExamen,
            idempresa: this.id_empresa
          };


          this.apiAlid.list_preguntas(this.id_examen)
            .subscribe((res: any) => {
              this.preguntas = res.preguntas;

            });

          this.apiAlid.list_respuestas_prese(this.id_examen)
            .subscribe((res: any) => {
              this.respuestas = res.respuestas;
            });


          this.apiAlid.validar_prese(infoPres)
            .subscribe((res: any) => {

              if (res.sucess == true && res.estado == 0) {

                Swal.fire({
                  title: 'Desea presentar el examen?',
                  text: res.mensaje,
                  icon: 'info',
                  showDenyButton: true,
                  confirmButtonText: 'Presentar',
                  denyButtonText: `No presentar`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {

                    this.iniciarExamen(this.idExamen, this.user.usu_id);
                    Swal.fire('Buena suerte!', '', 'success')
                  } else if (result.isDenied) {
                    this.router.navigate(['aliados/FanPag/', this.id_empresa]);
                  }
                })
              } else if (res.sucess == false && res.estado == 1) {
                Swal.fire({
                  title: 'Examen presentado',
                  text:  res.mensaje,
                  icon: 'warning',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['aliados/FanPag/', this.id_empresa]);
                  }
                })
              } else if (res.sucess == false && res.estado == 2) {
                Swal.fire({
                  title: 'Mensaje de usuario',
                  text:  res.mensaje,
                  icon: 'warning',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['aliados/FanPag/', this.id_empresa]);
                  }
                })
              }
            });

        });
    });
  }

  guardarResp(r) {



    const payload = {
      alumno: this.user.usu_id,
      data: r.value,
      idexamen: this.idExamen,
      idempresa: this.id_empresa,
      idpresentacion: this.id_prese
    };

    this.apiAlid.guardarRespuestasAlum(payload)
      .subscribe((res: any) => {

        this.sucess = true;
        this.mensaje = res.mensaje;

        setTimeout(() => {
          this.sucess = false;

          if (res.sucess == true) {
            this.validboton=false;
           clearInterval(this.myInterval);
            this.router.navigate(['aliados/FanPag/', this.id_empresa]);
          }
        }, 5000);

      });


  }

contadorFecha(fechaIni,duracion) {

  var currentDateObj = new Date(fechaIni);
  var numberOfMlSeconds = currentDateObj.getTime();
  var addMlSeconds = duracion * 60000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  return newDateObj;

}


  iniciarExamen(idExamen, idUsuario) {
    this.mostrar_info = true;
    const payload = {
      alumno: idUsuario,
      idexamen: idExamen,
      idempresa: this.id_empresa
    };

    this.apiAlid.iniciarExamen(payload)
      .subscribe((res: any) => {
        this.id_prese = res.id_presentacion;
        this.inicioExamen = true;
        this.presentacion = res.presentacion;
        this.duracion = res.duracion;

        const fechaInicio = new Date(this.presentacion.fecha_inicio);
        const auxFin = this.contadorFecha(fechaInicio, this.duracion);
        const dateFin =  new Date(auxFin);




        this.myInterval = setInterval(() => {

          const now = new Date();

          const fechaActual = {

            year:now.getFullYear(),
            mes:now.getMonth()+1,
            dia:now.getDate(),
            horas:now.getHours(),
            minutos:now.getMinutes(),
            segundos:now.getSeconds(),
          }

          const fechaFin = {
            year:dateFin.getFullYear(),
            mes:dateFin.getMonth()+1,
            dia:dateFin.getDate(),
            horas:dateFin.getHours(),
            minutos:dateFin.getMinutes(),
            segundos:dateFin.getSeconds(),
          }

          let diferencia = intervalToDuration({
            start: new Date(fechaActual.year, fechaActual.mes, fechaActual.dia , fechaActual.horas, fechaActual.minutos, fechaActual.segundos),
            end: new Date(fechaFin.year, fechaFin.mes, fechaFin.dia , fechaFin.horas, fechaFin.minutos, fechaFin.segundos),
          })


          console.log(diferencia.hours +'-'+ diferencia.minutes + '-' + diferencia.seconds);

         this.hourfalt = diferencia.hours;
         this.minfalt = diferencia.minutes;
         this.segfalt = diferencia.seconds;

          if(diferencia.hours == 0 && diferencia.minutes == 5 && diferencia.seconds == 0 ){
            Swal.fire('Quedan 5 minutos para reponder el examen');
          }else if (diferencia.hours == 0 && diferencia.minutes == 1 && diferencia.seconds == 0){

            Swal.fire('Quedan 1 minutos para reponder el examen');

          }else if(diferencia.hours == 0 && diferencia.minutes == 0 && diferencia.seconds == 0){
            Swal.fire('Tiempo finalizado para responder el examen');
           this.validtime = false;
           this.mostrar_info = false;
           //actualizar fecha caducidad

           this.apiAlid.examenTiempoLimite(this.id_prese)
           .subscribe((res:any)=>{

           })
           clearInterval(this.myInterval);
           this.router.navigate(['aliados/FanPag/', this.id_empresa]);

          }
          }, this.duracion);
      });

  }
}
