import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  private urlAPI = environment.apiURL;
  paises: any[] = [];
  httpOptions = {};

  mensajeUser = ''; // Mensaje para confirmacion de accion
  mostrarMsj = false;

  constructor(
    private http: HttpClient,
    private apiAuth: AuthService) {
    this.apiAuth.getUser();

    const token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }
  olvidaste_contra(email:string){
    return this.http.post(this.urlAPI + `rest_usuarios/olvidaste_contra`, { email: email });
  }

  /*
  getPaises() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access_key': '4504d12ad3c23ba40f54b5e6ff93b542'
      })
    };


    this.http.get(`https://api.countrylayer.com/rest/v2/all`, httpOptions)
      .subscribe((data: any) => {
        this.paises = data;
      });
  }
  */

getPerfiles(){
  return this.http.get(this.urlAPI + `Rest_perfiles/getPerfiles`);
}

  getPaises() {
    return this.http.get(this.urlAPI + `Auth/getPaises`);
  }


  getPaisesList(){
    return this.http.get(this.urlAPI + `Auth/getPaisesList`);
  }

  register(payload: any , perfil?: number){
    return this.http.post(this.urlAPI + `rest_usuarios/registrarse`, {payload,perfil});
  }

  getClientes(pagina: number) {
    return this.http.get( this.urlAPI+ `Rest_empresas/listar?pagina=${pagina}`);
  }

  eliminarCliente(cliente:number){
    return this.http.post(this.urlAPI + `Rest_empresas/eliminarCliente`, { cliente });

  }

  getCliente(id: number) {
    return this.http.post(this.urlAPI + `rest_empresas/traerId`, { emp_id: id });
  }

  guardarEditadoCliente(payload: any) {
    return this.http.post(this.urlAPI + `rest_empresas/editar`, payload);
  }

  guardarCliente(payload: any) {
    return this.http.post(this.urlAPI + `rest_empresas/crear`, payload);
  }

  getAllEmpresas() {
    return this.http.get(this.urlAPI + `rest_empresas/getall`);
  }

  getInstructores(pagina: number) {
    return this.http.get(this.urlAPI + `rest_instructores/listar?pagina=${pagina}`);
  }

  getInstructoresAll() {
    return this.http.get(this.urlAPI + `rest_instructores/listarAll`);
  }

  guardarInstructor(payload: any) {
    return this.http.post(this.urlAPI + `rest_instructores/crear`, payload);
  }

  getInstructor(id: number) {
    return this.http.post(this.urlAPI + `rest_instructores/traerId`, { id });
  }

  guardarEditadoInstructor(payload: any) {
    return this.http.post(this.urlAPI + `rest_instructores/editar`, payload);
  }

  getCursos(cliente: number, pagina?: number) {
    return this.http.post(this.urlAPI + `rest_cursos/cursosempresa?pagina=${pagina}`, { empresa: cliente });
  }

  guardarCurso(payload: any) {
    return this.http.post(this.urlAPI + `rest_cursos/crear`, payload);
  }

  updateOrdenCurso(fk_empresa:number,cur_id:number,orden:number){
    return this.http.post(this.urlAPI + `rest_cursos/updateOrdenCurso`, {fk_empresa,cur_id,orden});
  }

  eliminarCurso(empresa:number,curso:number){
    return this.http.post(this.urlAPI + `rest_cursos/eliminarCurso`, {empresa,curso});
  }

  guardarEditadocurso(payload: any) {
    return this.http.post(this.urlAPI + `rest_cursos/editar`, payload);
  }

  getClasesCurso(id: any) {
    return this.http.post(this.urlAPI + `rest_clases/traerporcurso`, { id });
  }

  getInstructoresCliente(cliente: any) {
    return this.http.get(this.urlAPI + `rest_instructores/traerporcliente?empresa=${cliente}`);
  }

  cursosClases(idCurso: number){
    return this.http.post(this.urlAPI + `rest_clases/cursosClases`, { idCurso });

  }
  guardarClase(payload: any) {
    return this.http.post(this.urlAPI + `rest_clases/crear`, payload);
  }

  editarClase(payload: any) {
    return this.http.post(this.urlAPI + `rest_clases/editar`, payload);
  }

  eliminarClase(id: number) {
    return this.http.post(this.urlAPI + `rest_clases/eliminar`, { id });
  }

  listadoCursosInstructor() {
    return this.http.get(this.urlAPI + `rest_cursos/cursosall`);
  }

  listadoCursosInstructorAdmin() {
    return this.http.get(this.urlAPI + `rest_cursos/cursosallAmin`);
  }

  getCursosInstructor(id: any) {
    return this.http.post(this.urlAPI + `rest_instructores/cursosinstructor`, { instructor: id });
  }

  getGimnasiosInstructor(id: any) {
    return this.http.post(this.urlAPI + `rest_instructores/giminstructor`, { instructor: id });
  }



  /* SERVICES FOR FRONTEND */
  getInstructoresFront(pagina?: number) {
    if (this.apiAuth.user?.usu_id){
      return this.http.post(this.urlAPI + `rest_instructores/listaractivos`, { usuario: this.apiAuth.user.usu_id, pagina });
    }else{
      return this.http.post(this.urlAPI + `rest_instructores/listaractivos`, { usuario: 0, pagina });
    }
  }

  getCursosFront() {
    return this.http.get(this.urlAPI + `rest_cursos/cursosall`);
  }


  getSedesFront() {
    return this.http.get(this.urlAPI + `rest_sedes/SedesAllF`);
  }


  createSed(payload: any){
    return this.http.post(this.urlAPI + `rest_sedes/crear`, payload);
  }

  SedeId(id_sede:number){
    return this.http.post(this.urlAPI + `rest_sedes/SedeId`, {id_sede});
  }

  deleteSede(id:number){
    return this.http.post(this.urlAPI + `rest_sedes/deleteSede`, { id });
  }


  searchInstructor(filtros: any) {
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    strGET += filtros.apellisearch.length > 0 ? `apellidos=${filtros.apellisearch }` : '';
    return this.http.get(this.urlAPI + `rest_instructores/filtrar${strGET}`);
  }

  getClase(id: number) {
    return this.http.post(this.urlAPI + `rest_clases/traerporid`, { clas_id: id });
  }

  getResponsePayment(refPayco) {
    return this.http.get('https://secure.epayco.co/validation/v1/reference/' + refPayco);
  }

  sendContact(payload: any) {
    return this.http.post(this.urlAPI + `rest_empresas/mail_contacto`, payload);
  }

  getAllGimnasios(pagina?: number){
    if (this.apiAuth.user?.usu_id){
      return this.http.post(this.urlAPI + `rest_gimnasios/listaractivos`, { usuario: this.apiAuth.user.usu_id, pagina });
    }else{
      return this.http.post(this.urlAPI + `rest_gimnasios/listaractivos`, { usuario: 0, pagina });
    }
  }

  createGym(payload: any){
    return this.http.post(this.urlAPI + `rest_gimnasios/crear`, payload);
  }

  saveEditGym(payload: any){
    return this.http.post(this.urlAPI + `rest_gimnasios/editar`, payload);
  }

  searchGimnasio(filtros: any) {
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    strGET += filtros.paisSearch.length > 0 ? `&pais=${filtros.paisSearch}` : '';
    strGET += filtros.perfilSearch.length > 0 ? `&perfil=${filtros.perfilSearch}` : '';
    return this.http.get(this.urlAPI + `rest_gimnasios/filtrar${strGET}`);
  }

  like(payload: any, tipo: any){
    if (tipo === 1){
      return this.http.post(this.urlAPI + `rest_instructores/likes`, payload);
    }else{
      return this.http.post(this.urlAPI + `rest_gimnasios/likes`, payload);
    }
  }


  getUsuarios(perfil:number,curso?:number,pagina?: number,emp_ws?){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_usuarios/listar`, { perfil,curso,pagina,emp_ws});

  }

  getInstructoresEmail(email:String){
    return this.http.post(this.urlAPI + `Rest_instructores/InstructorEmail`, {email});
  }


  getUsuarioEmail(email:String,perfil:number){
    return this.http.post(this.urlAPI + `Rest_usuarios/UsuarioEmail`, {email,perfil});
  }

  eliminarUsuario(usuario:number,curso:number,perfil:number){

    return this.http.post(this.urlAPI + `Rest_usuarios/eliminarUsuario`, {usuario,curso,perfil});
  }

  videoB(id:number){

    return this.http.post(this.urlAPI + `Rest_usuarios/videoB`, {id});
  }

  buscarUsuarios(filtros: any){
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    strGET += filtros.apellisearch.length > 0 ? `apellidos=${filtros.apellisearch }` : '';
    return this.http.get(this.urlAPI + `Rest_usuarios/filtrar${strGET}`);
  }

  buscarInstructor(filtros: any){
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    strGET += filtros.apellisearch.length > 0 ? `apellidos=${filtros.apellisearch }` : '';
    return this.http.get(this.urlAPI + `Rest_instructores/filtrar${strGET}`);
  }

  traerIdUsuario(id:number){
    return this.http.post(this.urlAPI + `Rest_usuarios/traerId`, { id });
  }



  guardarUsuario(payload:any){
    return this.http.post(this.urlAPI + `Rest_usuarios/crear`, payload);
  }



  editarusuario(payload:any){
    return this.http.post(this.urlAPI + `Rest_usuarios/editar`, payload);
  }

  getPayments(pagina?: number){
    return this.http.post(this.urlAPI + `rest_pagos/listar`, { pagina } );
  }


  getEmpresasAliadas(pagina?: number) {
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.get( this.urlAPI+ `Rest_empresas/empresasAliadas?pagina=${pagina}`);
  }

  CrearSocio(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/crear`, payload);
  }

  getSocios(pagina?: number) {
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.get( this.urlAPI+ `Rest_socios/listar?pagina=${pagina}`);
  }

  traerIdSocio(id:number){
    return this.http.post(this.urlAPI + `Rest_socios/traerId`, { id });
  }

  editarSocio(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/editar`, payload);
  }

  traerxcodigo(codigo:string){
    return this.http.post(this.urlAPI + `Rest_socios/traerxcodigo`, { codigo });
  }

  EmpreporUsu(usu:number,pagina?: number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.post(this.urlAPI + `Rest_socios/EmpreporUsu`, {usu,pagina});
  }

  CrearEmpresaWs(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/crearEmpresaWs`, payload);
  }

  TraerEmpresasId(id){
    return this.http.post(this.urlAPI + `Rest_socios/TraerEmpresasId`, { id });
  }

  editarEmpresaws(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/editarEmpresaWs`, payload);
  }

  traerempresasXcodigo(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/traerempresasXcodigo`, payload);
  }

  traeraliadosXempresa(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/traeraliadosXempresa`, payload);
  }

  generarInforme(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/generarInforme`, payload);
  }

  traeraliadosXsocio(payload:any){
    return this.http.post(this.urlAPI + `Rest_socios/traeraliadosXsocio`, payload);
  }

  eliminarInstructor(idAliado:number){
    return this.http.post(this.urlAPI + `Rest_instructores/eliminar`, { idAliado });
  }

  validUsu(idUsuario:number,newEstado:number,curso:number,perfil:number){
    return this.http.post(this.urlAPI + `Rest_usuarios/validUsu`, { idUsuario,newEstado,curso,perfil });
  }

  getSedesGim(idGim:number){
    return this.http.post(this.urlAPI + `Rest_sedes_gim/listar`, { idGim });
  }

  createSedeGym(payload: any){
    return this.http.post(this.urlAPI + `Rest_sedes_gim/crear`, payload);
  }

  guardarEditSede(payload: any){
    return this.http.post(this.urlAPI + `Rest_sedes_gim/editar`, payload);
  }

  getSedesClase(fk_gim:number,idSede:number){
    return this.http.post(this.urlAPI + `Rest_clases_sedes/listar`, { fk_gim,idSede });
  }

  createClaseSed(payload: any){
    return this.http.post(this.urlAPI + `Rest_clases_sedes/createClaseSed`, payload);
  }

  EditClase(payload: any){
    return this.http.post(this.urlAPI + `Rest_clases_sedes/EditClase`, payload);
  }

  DeleteClase(idClase:number,idSede:number){
    return this.http.post(this.urlAPI + `Rest_clases_sedes/DeleteClase`, { idClase,idSede });

  }


  


}
