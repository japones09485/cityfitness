import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { InstructoresComponent } from './admin/instructores/instructores.component';
import { MenuComponent } from './admin/shared/menu/menu.component';
import { EditarComponent } from './admin/clientes/editar.component';
import { NotificacionComponent } from './shared/notificacion.component';
import { EditarInstructorComponent } from './admin/instructores/editar-instructor.component';
import { CursosComponent } from './admin/cursos/cursos.component';
import { EditarCursoComponent } from './admin/cursos/editar-curso.component';
import { ClasesCursoComponent } from './admin/cursos/clases-curso.component';
import { EditarClaseComponent } from './admin/cursos/editar-clase.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { CursosHomeComponent } from './components/cursos-home/cursos-home.component';
import { ClasesHomeComponent } from './components/cursos-home/clases-home.component';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { GetNameContryPipe } from './pipes/get-name-contry.pipe';
import { PagoComponent } from './components/pago/pago.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { GuardAutGuard } from './services/guard-aut.guard';
import { HojavidaComponent } from './components/hojavida/hojavida.component';
import { GimnasiosComponent } from './admin/gimnasios/gimnasios.component';
import { EditarGimnasioComponent } from './admin/gimnasios/editar-gimnasio.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { GimfrontComponent } from './components/gimfront/gimfront.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { PagosComponent } from './admin/pagos/pagos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from './ventas/productos/productos.component';
import { MenuVentasComponent } from './ventas/menu-ventas/menu-ventas.component';
import { NuevoProdComponent } from './ventas/nuevo-prod/nuevo-prod.component';
import { InactivosComponent } from './ventas/inactivos/inactivos.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductoComponent } from './ventas/producto/producto.component';
import { EditarProductoComponent } from './ventas/nuevo-prod/editar-producto.component';
import { UsersComponent } from './admin/users/users.component';
import { UserComponent } from './admin/users/user/user.component';
import { EdituserComponent } from './admin/users/edituser/edituser.component';
import { ListadoCarritoComponent } from './ventas/listado-carrito/listado-carrito.component';
import { FanPageComponent } from './components/aliados/fan-page/fan-page.component';
import { AdminAliadoComponent } from './aliados/admin-aliado/admin-aliado.component';
import { MenualiadoComponent } from './aliados/menualiado/menualiado.component';
import { AliadosComponent } from './components/aliados/aliados.component';
import { ClasesComponent } from './aliados/admin-aliado/clases/clases.component';
import { NuevaClaseComponent } from './aliados/admin-aliado/clases/nueva-clase/nueva-clase.component';
import { EditClaseComponent } from './aliados/admin-aliado/clases/edit-clase/edit-clase.component';
import { VideosComponent } from './aliados/admin-aliado/videos/videos.component';
import { NuevoVideoComponent } from './aliados/admin-aliado/videos/nuevo-video/nuevo-video.component';
import { EditarVideoComponent } from './aliados/admin-aliado/videos/editar-video/editar-video.component';
import { VideosAliadosComponent } from './components/aliados/videos-aliados/videos-aliados.component';
import { InscripcionComponent } from './aliados/admin-aliado/inscripcion/inscripcion.component';
import { RecuperarPassComponent } from './components/recuperar-pass/recuperar-pass.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component';
import { RessetPasswordComponent } from './components/resset-password/resset-password.component';
import { InfocursoComponent } from './components/infocurso/infocurso.component';
import { RecursoshumanosComponent } from './admin/recursoshumanos/recursoshumanos.component';
import { AdminEmpresasComponent } from './empresas/admin-empresas/admin-empresas.component';
import { MenuempresaComponent } from './empresas/menuempresa/menuempresa.component';
import { PlanesempresaComponent } from './empresas/planesempresa/planesempresa.component';
import { VideosempresaComponent } from './empresas/videosempresa/videosempresa.component';
import { ClasesempresaComponent } from './empresas/clasesempresa/clasesempresa.component';
import { NewClaseEmpresaComponent } from './empresas/clasesempresa/new-clase-empresa/new-clase-empresa.component';
import { EditClaseEmpresaComponent } from './empresas/clasesempresa/edit-clase-empresa/edit-clase-empresa.component';
import { NewvideoempresaComponent } from './empresas/videosempresa/newvideoempresa/newvideoempresa.component';
import { EditvideoempresaComponent } from './empresas/videosempresa/editvideoempresa/editvideoempresa.component';
import { ListalumnosComponent } from './empresas/listalumnos/listalumnos.component';
import { AlumnosempresaComponent } from './empresas/alumnosempresa/alumnosempresa.component';
import { EmpresasAliadasComponent } from './components/empresas-aliadas/empresas-aliadas.component';
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
import { ContactoComponent } from './components/contacto/contacto.component';
import { VideoBComponent } from './components/aliados/video-b/video-b.component';
import { ExamenesComponent } from './empresas/examenes/examenes.component';
import { ExamenComponent } from './empresas/examenes/examen/examen.component';
import { PreguntasComponent } from './empresas/examenes/preguntas/preguntas.component';
import { RespuestasComponent } from './empresas/examenes/respuestas/respuestas.component';
import { PresentarexComponent } from './components/aliados/presentarex/presentarex.component';
import { ResultadosComponent } from './empresas/examenes/resultados/resultados.component';
import { AlumRecuperacionComponent } from './empresas/examenes/alum-recuperacion/alum-recuperacion.component';
import { DetalleComponent } from './empresas/examenes/resultados/detalle/detalle.component';
import { TrabajosComponent } from './empresas/trabajos/trabajos.component';
import { TrabajoComponent } from './empresas/trabajos/trabajo/trabajo.component';
import { RespuestaComponent } from './empresas/trabajos/respuesta/respuesta.component';
import { CargaRespComponent } from './components/aliados/carga-resp/carga-resp.component';
import { ClaseDetalleComponent } from './components/cursos-home/clase-detalle/clase-detalle.component';
import { SedesComponent } from './admin/sedes/sedes.component';
import { SedeComponent } from './admin/sedes/sede/sede.component';
import { SedesFrontComponent } from './components/sedes-front/sedes-front.component';
import { IntructorPageComponent } from './components/intructor-page/intructor-page.component';
import { CertificacionesComponent } from './admin/instructores/certificaciones/certificaciones.component';
import { CarrerasComponent } from './admin/carreras/carreras.component';
import { SedesGimComponent } from './admin/sedes-gim/sedes-gim.component';
import { EditSedeGComponent } from './admin/sedes-gim/edit-sede-g.component';
import { ClasesSedeComponent } from './admin/sedes-gim/clases-sede/clases-sede.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CronogramaComponent,
    PlanesComponent,
    ClientesComponent,
    InstructoresComponent,
    MenuComponent,
    EditarComponent,
    NotificacionComponent,
    EditarInstructorComponent,
    CursosComponent,
    EditarCursoComponent,
    ClasesCursoComponent,
    EditarClaseComponent,
    EntrenadoresComponent,
    CursosHomeComponent,
    ClasesHomeComponent,
    DayOfWeekPipe,
    EmpresasComponent,
    GetNameContryPipe,
    PagoComponent,
    ConfirmationComponent,
    InicioComponent,
    HojavidaComponent,
    GimnasiosComponent,
    EditarGimnasioComponent,
    RegistrarseComponent,
    GimfrontComponent,
    SafeHtmlPipe,
    PaginacionComponent,
    PagosComponent,
    ProductosComponent,
    MenuVentasComponent,
    NuevoProdComponent,
    InactivosComponent,
    TiendaComponent,
    ProductoComponent,
    EditarProductoComponent,
    UsersComponent,
    UserComponent,
    EdituserComponent,
    ListadoCarritoComponent,
    FanPageComponent,
    AdminAliadoComponent,
    MenualiadoComponent,
    AliadosComponent,
    ClasesComponent,
    NuevaClaseComponent,
    EditClaseComponent,
    VideosComponent,
    NuevoVideoComponent,
    EditarVideoComponent,
    VideosAliadosComponent,
    InscripcionComponent,
    RecuperarPassComponent,
    ConferenciaComponent,
    RessetPasswordComponent,
    InfocursoComponent,
    RecursoshumanosComponent,
    AdminEmpresasComponent,
    MenuempresaComponent,
    PlanesempresaComponent,
    VideosempresaComponent,
    ClasesempresaComponent,
    NewClaseEmpresaComponent,
    EditClaseEmpresaComponent,
    NewvideoempresaComponent,
    EditvideoempresaComponent,
    ListalumnosComponent,
    AlumnosempresaComponent,
    EmpresasAliadasComponent,
    SociosComponent,
    CreateSocioComponent,
    EditSocioComponent,
    WebsociosComponent,
    WebsociosinicioComponent,
    WebsociosempresasComponent,
    WebsociosempresascreateComponent,
    WebsociosempresaseditComponent,
    WebsociosinstructoresComponent,
    FrontWebsociosempresasComponent,
    FrontWebsociosInstructoresComponent,
    ContactoComponent,
    VideoBComponent,
    ExamenesComponent,
    ExamenComponent,
    PreguntasComponent,
    RespuestasComponent,
    PresentarexComponent,
    ResultadosComponent,
    AlumRecuperacionComponent,
    DetalleComponent,
    TrabajosComponent,
    TrabajoComponent,
    RespuestaComponent,
    CargaRespComponent,
    ClaseDetalleComponent,
    SedesComponent,
    SedeComponent,
    SedesFrontComponent,
    IntructorPageComponent,
    CertificacionesComponent,
    CarrerasComponent,
    SedesGimComponent,
    EditSedeGComponent,
    ClasesSedeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,

  ],
  providers: [
    GuardAutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
