import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

/* Componentes Administrativos */
import { GuardAutGuard } from './services/guard-aut.guard';
import { InicioComponent } from './admin/inicio/inicio.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { EditarComponent } from './admin/clientes/editar.component';
import { SedesComponent } from './admin/sedes/sedes.component';
import { SedeComponent } from './admin/sedes/sede/sede.component';
import { InstructoresComponent } from './admin/instructores/instructores.component';
import { EditarInstructorComponent } from './admin/instructores/editar-instructor.component';
import { CursosComponent } from './admin/cursos/cursos.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { CursosHomeComponent } from './components/cursos-home/cursos-home.component';
import { ClaseDetalleComponent } from "./components/cursos-home/clase-detalle/clase-detalle.component";
import { EmpresasComponent } from './components/empresas/empresas.component';
import { RecuperarPassComponent } from './components/recuperar-pass/recuperar-pass.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component'
import { PagoComponent } from './components/pago/pago.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InfocursoComponent } from './components/infocurso/infocurso.component';
import { GimnasiosComponent } from './admin/gimnasios/gimnasios.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { GimfrontComponent } from './components/gimfront/gimfront.component';
import { PagosComponent } from './admin/pagos/pagos.component';
import { UsersComponent } from './admin/users/users.component';
import { UserComponent } from './admin/users/user/user.component';
import { EdituserComponent}  from './admin/users/edituser/edituser.component';
import { FanPageComponent } from './components/aliados/fan-page/fan-page.component';
import { CargaRespComponent } from "./components/aliados/carga-resp/carga-resp.component";
import  { RessetPasswordComponent } from './components/resset-password/resset-password.component';
import { RecursoshumanosComponent } from './admin/recursoshumanos/recursoshumanos.component';
import { SociosComponent } from './admin/socios/socios.component';
import { CreateSocioComponent } from './admin/socios/create-socio/create-socio.component';
import { EditSocioComponent } from './admin/socios/edit-socio/edit-socio.component';
import { WebsociosComponent } from './components/websocios/websocios.component';
import { WebsociosinicioComponent } from './components/websocios/websociosinicio/websociosinicio.component';
import { WebsociosempresasComponent } from './components/websocios/websociosempresas/websociosempresas.component';
import { WebsociosempresascreateComponent } from './components/websocios/websociosempresas/websociosempresascreate/websociosempresascreate.component';
import { WebsociosempresaseditComponent } from './components/websocios/websociosempresas/websociosempresasedit/websociosempresasedit.component';
import { WebsociosinstructoresComponent } from './components/websocios/websociosinstructores/websociosinstructores.component';
import { FrontWebsociosempresasComponent } from './components/websocios/front-websociosempresas/front-websociosempresas.component';
import { FrontWebsociosInstructoresComponent } from './components/websocios/front-websocios-instructores/front-websocios-instructores.component';
import { SedesFrontComponent } from "./components/sedes-front/sedes-front.component";
import { IntructorPageComponent } from "./components/intructor-page/intructor-page.component";
import { CertificacionesComponent } from "./admin//instructores/certificaciones/certificaciones.component";
import { CarrerasComponent } from "./admin/carreras/carreras.component";
/* Fin Componentes Administrativos */
/*Componentes de Ventas*/

import { ProductosComponent } from './ventas/productos/productos.component';
import { NuevoProdComponent } from './ventas/nuevo-prod/nuevo-prod.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductoComponent } from './ventas/producto/producto.component';
import { EditarProductoComponent } from './ventas/nuevo-prod/editar-producto.component';
import { ListadoCarritoComponent } from './ventas/listado-carrito/listado-carrito.component';


/* COMPONENTES ALIADOS */
import { AdminAliadoComponent } from './aliados/admin-aliado/admin-aliado.component';
import { AliadosComponent } from './components/aliados/aliados.component';
import { VideoBComponent } from './components/aliados/video-b/video-b.component';
import { PresentarexComponent } from './components/aliados/presentarex/presentarex.component';
import { VideosAliadosComponent } from '././components/aliados/videos-aliados/videos-aliados.component';
import { ClasesComponent } from './aliados/admin-aliado/clases/clases.component';
import { NuevaClaseComponent } from './aliados/admin-aliado/clases/nueva-clase/nueva-clase.component';
import { EditClaseComponent } from './aliados/admin-aliado/clases/edit-clase/edit-clase.component';
import { VideosComponent } from './aliados/admin-aliado/videos/videos.component';
import { NuevoVideoComponent } from './aliados/admin-aliado/videos/nuevo-video/nuevo-video.component';
import { EditarVideoComponent } from './aliados/admin-aliado/videos/editar-video/editar-video.component';
import { InscripcionComponent } from './aliados/admin-aliado/inscripcion/inscripcion.component';
import { ExamenesComponent } from './empresas/examenes/examenes.component';
import { ExamenComponent } from './empresas/examenes/examen/examen.component';
import { PreguntasComponent } from './empresas/examenes/preguntas/preguntas.component';
import { RespuestasComponent } from './empresas/examenes/respuestas/respuestas.component';
import { ResultadosComponent } from './empresas/examenes/resultados/resultados.component';
import { DetalleComponent } from './empresas/examenes/resultados/detalle/detalle.component';
import { AlumRecuperacionComponent } from "./empresas/examenes/alum-recuperacion/alum-recuperacion.component";
import { TrabajosComponent } from "./empresas/trabajos/trabajos.component";
import { TrabajoComponent } from "./empresas/trabajos/trabajo/trabajo.component";
import { RespuestaComponent } from "./empresas/trabajos/respuesta/respuesta.component";



/*COMPONENTES ADMIN EMPRESAS*/
import { AdminEmpresasComponent } from './empresas/admin-empresas/admin-empresas.component';
import { ClasesempresaComponent } from './empresas/clasesempresa/clasesempresa.component';
import { NewClaseEmpresaComponent } from './empresas/clasesempresa/new-clase-empresa/new-clase-empresa.component';
import { EditClaseEmpresaComponent } from './empresas/clasesempresa/edit-clase-empresa/edit-clase-empresa.component';
import { VideosempresaComponent } from './empresas/videosempresa/videosempresa.component';
import { NewvideoempresaComponent } from './empresas/videosempresa/newvideoempresa/newvideoempresa.component';
import { EditvideoempresaComponent } from './empresas/videosempresa/editvideoempresa/editvideoempresa.component';
import { ListalumnosComponent } from './empresas/listalumnos/listalumnos.component';
import { EmpresasAliadasComponent } from './components/empresas-aliadas/empresas-aliadas.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: InicioComponent },
  { path: 'admin/recursoshumanos', component: RecursoshumanosComponent, canActivate:[GuardAutGuard] },
  { path: 'admin/clientes', component: ClientesComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/clientes/editar/:id', component: EditarComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/instructores', component: InstructoresComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/instructores/editar/:id', component: EditarInstructorComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/instructores/editarex/:externo/:id', component: EditarInstructorComponent },
  { path: 'admin/cursos/:id', component: CursosComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/gimnasios', component: GimnasiosComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/socios', component: SociosComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/sedes', component: SedesComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/sede/:idsede', component: SedeComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/create_socios', component: CreateSocioComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/edit_socios/:id', component: EditSocioComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/pagos', component: PagosComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/user/:perfil/:curso/:empresaws/:mailY', component: UserComponent },
  { path: 'admin/carreras', component: CarrerasComponent , canActivate:[GuardAutGuard] },
  { path: 'admin/user/:perfil/:curso/:empresaws', component: UserComponent },
  { path: 'admin/userMail/:perfil/:mailY', component: UserComponent },
  { path: 'admin/users/:perfil', component: UsersComponent, canActivate:[GuardAutGuard] },
  { path: 'admin/users/:perfil/:empws/:EmailAliado', component: UsersComponent },
  { path: 'admin/instructorY/:inst/:EmailInstr', component: InstructoresComponent },
  { path: 'admin/users/:perfil/:empws', component: UsersComponent, canActivate:[GuardAutGuard] },
  { path: 'admin/userscur/:perfil/:curso', component: UsersComponent, canActivate:[GuardAutGuard] },
  { path: 'admin/editUser/:id', component: EdituserComponent, canActivate:[GuardAutGuard] },
  { path: 'admin/editUsermailY/:id/:perfil/:mailY', component: EdituserComponent },
  { path: 'admin/editUser/:id/:perfil/:empresaws', component: EdituserComponent, canActivate:[GuardAutGuard] },
  { path: 'aliados', component: AliadosComponent },
  { path: 'entrenadores', component: EntrenadoresComponent },
  { path: 'aliados/FanPag/:id', component: FanPageComponent},
  { path: 'aliados/CargaRes/:id_trabajo', component: CargaRespComponent},
  { path: 'aliados/videos/:id', component: VideosAliadosComponent },
  { path: 'aliados/videos/:id/:empresasocio', component: VideosAliadosComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'gimnasios', component: GimfrontComponent },
  { path: 'recordar-password', component: RecuperarPassComponent },
  { path: 'cursos-disponibles', component: CursosHomeComponent },
  { path: 'clasesDetalle/:idCurso', component: ClaseDetalleComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'SedesF', component: SedesFrontComponent },
  { path: 'InstructorPage/:idIns', component:  IntructorPageComponent},

  { path: 'pago-clase/:id', component: PagoComponent },
  { path: 'confirmacion', component: ConfirmationComponent },
  { path: 'ventas/productos', component: ProductosComponent , canActivate:[GuardAutGuard] },
  { path: 'ventas/new', component: NuevoProdComponent , canActivate:[GuardAutGuard] },
  { path: 'tienda', component: TiendaComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'ventas/editProd/:id', component: EditarProductoComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'listCar', component: ListadoCarritoComponent },
  { path: 'adminAlid', component: AdminAliadoComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/clases', component: ClasesComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/newclase', component: NuevaClaseComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/editclase/:fkaliado/:id', component: EditClaseComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/videos', component: VideosComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/newvideo', component:  NuevoVideoComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/editvideo/:id', component: EditarVideoComponent , canActivate:[GuardAutGuard] },
  { path: 'adminAlid/inscripcion', component: InscripcionComponent , canActivate:[GuardAutGuard] },
  { path: 'conferencia/:id', component: ConferenciaComponent },
  { path: 'resetpass/:id', component: RessetPasswordComponent },
  { path : 'infocurso' , component: InfocursoComponent},
  { path : 'adminempresa/:id' , component: AdminEmpresasComponent},
  { path : 'clasesempresa/:id' , component: ClasesempresaComponent},
  { path : 'newclassempresa/:id' , component: NewClaseEmpresaComponent},
  { path : 'editclassempresa/:idempresa/:idclase' , component: EditClaseEmpresaComponent},
  { path : 'videosempresa/:id' , component: VideosempresaComponent},
  { path : 'newvideoempresa/:id' , component: NewvideoempresaComponent},
  { path : 'editvideoempresa/:idempresa/:idvideo' , component: EditvideoempresaComponent},
  { path : 'alumnosempresa/:idempresa' , component: ListalumnosComponent},
  { path : 'aliado/certificacion/:idaliados' , component: CertificacionesComponent},
  { path : 'aliado/certificacion/:idaliados/:vista' , component: CertificacionesComponent},
    //examenes
  { path : 'empresa/Examenes/:id' ,component:   ExamenesComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Examen/:id_empresa/:id_examen' ,component:   ExamenComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Preguntas/:id_empresa/:id_examen' ,component:   PreguntasComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Respuestas/:id_empresa/:id_examen' ,component:   RespuestasComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Resultados/:id_examen' ,component:   ResultadosComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Detalle/:presentacion' ,component:   DetalleComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/alum_recuperacion/:id_examen' ,component:   AlumRecuperacionComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Apoyo/:id_empresa/:tipo_doc' ,component:   TrabajosComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Trabajos/:id_empresa/:tipo_doc' ,component:   TrabajosComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Trabajo/:id_empresa/:id_trabajo/:tipo_edit/:tipo_doc' ,component:   TrabajoComponent, canActivate:[GuardAutGuard] },
  { path : 'empresa/Trabajo/respuesta/:id_trabajo' ,component:   RespuestaComponent, canActivate:[GuardAutGuard] },


  { path : 'empresasAliadas' , component: EmpresasAliadasComponent},
  { path : 'websociosCTF/:codigo' , component: WebsociosComponent},
  { path : 'websociosinicio' , component: WebsociosinicioComponent},
  { path : 'websociosempresas' , component: WebsociosempresasComponent},
  { path : 'websociosempresascr' , component: WebsociosempresascreateComponent},
  { path : 'websociosempresased/:id' , component: WebsociosempresaseditComponent},
  { path : 'websociosinstructores/:id' , component: WebsociosinstructoresComponent},
  { path : 'websociosfontempresas/:id' ,component: FrontWebsociosempresasComponent},
  { path : 'websociosfontinstructores/:id' ,component:   FrontWebsociosInstructoresComponent},
  { path : 'presentarex/:idexamen/:id_empresa' ,component:   PresentarexComponent, canActivate:[GuardAutGuard] },
  { path : 'videoB/:id' ,component:   VideoBComponent},


  //Rutas por defecto
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
