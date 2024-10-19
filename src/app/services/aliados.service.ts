import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AliadosService {

  private urlAPI = environment.apiURL;
  constructor( private http: HttpClient,
               private apiAuth: AuthService) { }

   listarActivos(pagina?: number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.get( this.urlAPI+ `Rest_aliados/listarAliados?pagina=${pagina}`);
  }

   getplanes(id_aliado: number) {
   return this.http.post(this.urlAPI + `Rest_aliados/traerId`, { id_aliado });
  }

  guardarplanes(payload: any){
    return this.http.post(this.urlAPI + `Rest_aliados/GuardarPlanes`, payload);
  }

  searchAliado(filtros: any) {
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    strGET += filtros.paisSearch.length > 0 ? `&pais=${filtros.paisSearch}` : '';
    strGET += filtros.perfilSearch.length > 0 ? `&perfil=${filtros.perfilSearch}` : '';
    return this.http.get(this.urlAPI + `rest_instructores/filtrar${strGET}`);
  }

  TraerxId(id:number){
    return this.http.post(this.urlAPI + `Rest_aliados/AliadoId`, { id });
  }

  ClasexId(id:number){
    return this.http.post(this.urlAPI + `Rest_aliados/ClaseId`, { id });
  }

  programarClase(payload: any){
    return this.http.post(this.urlAPI + `Rest_aliados/programarClase`, payload);
  }

  editarClase(payload: any){

    return this.http.post(this.urlAPI + `Rest_aliados/editarClase`, payload);
  }

  listarClasesAlid(id:number , pagina: number){

    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_aliados/listarClasesAlid`, { id,pagina });

  }



  ClasesAlidFront(id:number){

    return this.http.post( this.urlAPI+ `Rest_aliados/ClasesAlidFront`,{ id });

  }

  GuardarVideo(payload: any){
    return this.http.post(this.urlAPI + `Rest_aliados/GuardarVideo`, payload);
  }

  listarVidAll(id_aliado:number){
    return this.http.post(this.urlAPI + `Rest_aliados/listarVidAll`, { id_aliado });
  }

  listarVid(id_aliado:number){
    return this.http.post(this.urlAPI + `Rest_aliados/listarVid`, { id_aliado });
  }

  VideoxId(id:number){
    return this.http.post(this.urlAPI + `Rest_aliados/VideoxId`, { id });
  }

  editarVideo(payload: any){
    return this.http.post(this.urlAPI + `Rest_aliados/editarVideo`, payload);
  }

  deletevideo(id:number){
    return this.http.post(this.urlAPI + `Rest_aliados/deleteVideo`, { id });
  }

  ListarAlumnos(user:number,pagina?: number){

    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_aliados/ListarAlumnos`, { user,pagina });
  }

  InscribirAlumno(data: any,user:number){
    return this.http.post(this.urlAPI + `Rest_aliados/InscribirAlumno`, { data,user });
  }

  EliminarAlumno(id_reg:number,alumno:number,aliado:number){
    return this.http.post(this.urlAPI + `Rest_aliados/EliminarAlumno`, { id_reg,alumno,aliado});
  }

  VerifiAlumno(user:number, alumno:number){
    return this.http.post(this.urlAPI + `Rest_aliados/VerifiAlumno`, { user, alumno });
  }

  EstadoClase(id:number, estado :number){
    return this.http.post(this.urlAPI + `Rest_aliados/EstadoClase`, { id, estado });
  }

  ampliarSubsripcion(id_alum:number, idAliado:number, fecha_fin:string,meses:number){
    return this.http.post(this.urlAPI + `Rest_aliados/ampliarSubsripcion`, { id_alum, idAliado, fecha_fin, meses });
  }

  listadoalumnos(payload:any,id:number){

    return this.http.post(this.urlAPI + `Rest_aliados/listadoalumnos`, { fechas: payload, id_instructor: id });
  }

  //examenes

  listarExamenes(id:number , pagina: number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_examenes/listarAll`, { id,pagina });
  }

  listarExamenesAc(id:number , pagina: number, alumno:number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_examenes/listarActivos`, { id,pagina,alumno });
  }

  ExamenId(id:number){
    return this.http.post(this.urlAPI + `Rest_examenes/traerId`, { id });
  }

  crearExamen(payload: any){
    return this.http.post(this.urlAPI + `Rest_examenes/crearExamen`, payload);
  }

  editarExamen(payload: any){
    return this.http.post(this.urlAPI + `Rest_examenes/editarExamen`, payload);
  }

  estadoExamen(id_examen:number,estado:number,aliado:number){
    return this.http.post(this.urlAPI + `Rest_examenes/estadoExamen`, { id_examen,estado,aliado });
  }

  eliminarExamen(id_examen:number,id_empresa:number){
    return this.http.post(this.urlAPI + `Rest_examenes/eliminarExamen`, { id_examen,id_empresa });
  }

  iniciarExamen(payload: any){
    return this.http.post(this.urlAPI + `Rest_examenes/iniciarExamen`, payload);
  }

  resultadosExamen(id_examen:number){
    return this.http.post(this.urlAPI + `Rest_examenes/resultadosExamen`, { id_examen});
  }


  validar_prese(payload: any){
    return this.http.post(this.urlAPI + `Rest_examenes/validar_prese`, payload);
  }

  examenCaducado(payload){
    return this.http.post(this.urlAPI + `Rest_examenes/examenCaducado`, payload);
  }

  examenTiempoLimite(id_presentacion:number){
    return this.http.post(this.urlAPI + `Rest_examenes/examenTiempoLimite`, { id_presentacion });
  }

  guardarPreguntas(payload: any){
    return this.http.post(this.urlAPI + `Rest_preguntas/guardarPreguntas`, payload);
  }

  list_preguntas(id:number){
    return this.http.post(this.urlAPI + `Rest_preguntas/list_preguntas`, { id });
  }

  eliminar_preg(id_pres:number,id_exa:number){
    return this.http.post(this.urlAPI + `Rest_preguntas/eliminar_preg`, { id_pres,id_exa });
  }

  add_preg(payload: any){
    return this.http.post(this.urlAPI + `Rest_preguntas/add_preg`, payload);
  }

  guardarRespuestas(payload: any){
    return this.http.post(this.urlAPI + `Rest_respuestas/guardarRespuestas`, payload);
  }

  list_respuestas(id:number){
    return this.http.post(this.urlAPI + `Rest_respuestas/list_respuestas`, { id });
  }

  list_respuestas_prese(id:number){
    return this.http.post(this.urlAPI + `Rest_respuestas/list_respuestas_prese`, { id });
  }

  guardarRespuestasAlum(payload: any){
    return this.http.post(this.urlAPI + `Rest_respuestas_alum/guardarRespuestas`, payload);
  }

  Inscri_alum_examen(payload: any){
    return this.http.post(this.urlAPI + `Rest_examenes/Inscri_alum_examen`, payload);
  }

  List_alum_examen(id_examen:number){
    return this.http.post(this.urlAPI + `Rest_examenes/List_alum_examen`, {id_examen});
  }

  eliminar_alum_examen(id_rec:number,id_examen:number){
    return this.http.post(this.urlAPI + `Rest_examenes/eliminar_alum_examen`, {id_rec,id_examen});
  }

  verResultado(id_pres:number){
    return this.http.post(this.urlAPI + `Rest_examenes/verResultado`, {id_pres});
  }

  List_trabajos(id_empresa:number,tipo_doc:number){
    return this.http.post(this.urlAPI + `Rest_trabajos/listarTrabajos`, {id_empresa,tipo_doc});
  }


  List_trabajosAct(id_empresa:number,tipo_doc:number){
    return this.http.post(this.urlAPI + `Rest_trabajos/List_trabajosAct`, {id_empresa,tipo_doc});
  }

  TrabajoId(id:number){
    return this.http.post(this.urlAPI + `Rest_trabajos/TrabajoId`, { id});
  }

  eliminarTrabajo(id:number,id_empresa:number){
    return this.http.post(this.urlAPI + `Rest_trabajos/eliminarTrabajo`, { id,id_empresa });
  }

  crearTrabajo(payload: any){
    return this.http.post(this.urlAPI + `Rest_trabajos/crearTrabajo`, payload);
  }


  editarTrabajo(payload: any){
    return this.http.post(this.urlAPI + `Rest_trabajos/editarTrabajo`, payload);
  }

  listarRespuestasTrabajos(id_trabajo){
    return this.http.post(this.urlAPI + `Rest_trabajos/RespuestasTrabajos`, { id_trabajo });
  }

  GuardarRespuestaAl(payload:any){
    return this.http.post(this.urlAPI + `Rest_trabajos/GuardarRespuesta`, payload);
  }

  EliminarPresentacion(id:number,id_examen:number){
    return this.http.post(this.urlAPI + `Rest_examenes/EliminarPresentacion`, { id,id_examen });


  }

  CertificacionAliado(idaliados:number){

    return this.http.post(this.urlAPI + `Rest_aliados/CertificacionAliado`, { idaliados });
  }

  crearCertificacion(payload:any){
    return this.http.post(this.urlAPI + `Rest_aliados/crearCertificacion`, payload);
  }

  certiId(idCerti:number){
    return this.http.post(this.urlAPI + `Rest_aliados/certiId`, { idCerti });
  }

  DeleteCert(idCerti:number,idAliado:number){
    return this.http.post(this.urlAPI + `Rest_aliados/DeleteCert`, { idCerti,idAliado });
  }

  listarCarreras(){
    return this.http.post(this.urlAPI + `Rest_aliados/listar_carreras`,{});
  }

  listarCarrerasActi(id_aliado){
    return this.http.post(this.urlAPI + `Rest_aliados/listar_carreras_acti`,{id_aliado});
  }

  EliminarCarrera(idCarrera:number){
    return this.http.post(this.urlAPI + `Rest_aliados/EliminarCarrera`, { idCarrera });
  }

  guardarCarrera(payload:any){
    return this.http.post(this.urlAPI + `Rest_aliados/guardarCarrera`, payload);
  }

  InfoCarrera(idCarrera:number){
    return this.http.post(this.urlAPI + `Rest_aliados/InfoCarrera`, { idCarrera });
  }

  EditarCarrera(payload:any){
    return this.http.post(this.urlAPI + `Rest_aliados/EditarCarrera`, payload);
  }

  AgregarCarrera(payload:any){
    return this.http.post(this.urlAPI + `Rest_aliados/AgregarCarrera`, payload);
  }

  eliminarCarreraAlid(idAliado,idCarrera){
    return this.http.post(this.urlAPI + `Rest_aliados/eliminarCarreraAlid`, { idAliado,idCarrera });
  }


}
