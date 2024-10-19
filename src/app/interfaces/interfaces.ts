export interface Cliente {
  emp_id?: string;
  emp_nombre?: string;
  emp_nit?: string;
  emp_descripcion?: string;
  emp_pais?: string;
  emp_ciudad?: string;
  emp_facebook?: string;
  emp_instagram?: string;
  emp_foto1?: string;
  emp_foto2?: string;
  emp_foto3?: string;
  emp_vision?: string;
  emp_mision?: string;
  emp_estado?: string;
  emp_telefono?: string;
  emp_email?: string;
}

export interface RespuestaClientes {
  lista: Cliente[];
  ok: boolean;
  pag_actual: string;
  cant_paginas: number;
}

export interface RespuestaCrear {
  data: Cliente;
  ok: boolean;
}

// Respuestas de instructor
export interface Instructor {
  ins_id?: string;
  ins_identificacion?: string;
  ins_nombre?: string;
  ins_apellido?: string;
  ins_fk_empresa?: string;
  ins_descrp_profesional?: string;
  ins_fk_perfil?: number;
  ins_correo?: string;
  ins_facebook?: string;
  ins_instagram?: string;
  ins_estado?: string;
  ins_telefono?: string;
  ins_fk_pais?: string;
  ins_fk_ciudad?: string;
  ins_foto1?: string;
  ins_foto2?: string;
  ins_foto3?: string;
  ins_foto4?: string;
  ins_foto5?: string;
  cursos?: Curso[];
  gimnasios?: Gimnasio[];
  likes?: Like[];
  ins_likes?: number;
  verlike?: boolean;
}

export interface RespInstructor {
  lista: Instructor[];
  ok: boolean;
  pag_actual: string;
  cant_pag: number;
}

// Respuestas de cursos
export interface RespCursos {
  lista: Curso[];
  ok: boolean;
  pag_actual: number;
  cant_paginas: number;
  cantidad: number;
}

export interface Curso {
  cur_id?: number;
  cur_nombre?: string;
  cur_descripcion?: string;
  cur_fk_empresa?: string;
  cur_foto1?: string;
  cur_foto2?: string;
  cur_foto3?: string;
  cur_foto4?: string;
  cur_estado?: string;
  emp_id?: string;
  emp_nombre?: string;
  emp_nit?: string;
  emp_descripcion?: string;
  emp_telefono?: string;
  emp_email?: string;
  emp_pais?: string;
  emp_ciudad?: string;
  emp_foto1?: string;
  emp_foto2?: string;
  emp_foto3?: string;
  emp_vision?: string;
  emp_mision?: string;
  emp_estado?: string;
}

// Clases
export interface Clase {
  clas_id?: string;
  clas_nombre?: string;
  clas_descripcion?: string;
  clas_fecha_inicio?: string;
  clas_hora?: string;
  clas_fk_instructor?: string;
  clas_fk_curso?: string;
  clas_tipo?: string;
  clas_enlace?: string;
  clas_estado?: string;
  clas_valor?: string;
  cur_id?: string;
  cur_nombre?: string;
  cur_descripcion?: string;
  cur_fk_empresa?: string;
  cur_foto1?: string;
  cur_foto2?: string;
  cur_foto3?: string;
  cur_foto4?: string;
  cur_estado?: string;
  ins_id?: string;
  ins_identificacion?: string;
  ins_nombre?: string;
  ins_apellido?: string;
  ins_fk_empresa?: string;
  ins_descrp_profesional?: string;
  ins_especialidades?: string;
  ins_correo?: string;
  ins_facebook?: string;
  ins_instagram?: string;
  ins_estado?: string;
  ins_telefono?: string;
  ins_fk_pais?: string;
  ins_foto1?: string;
  ins_foto2?: string;
  ins_foto3?: string;
  ins_foto4?: string;
  ins_foto5?: string;
  ins_fk_perfil?: string;
}

export interface RespClases {
  ok: boolean;
  data: Clase[];
}

export interface User {
  usu_id?: number;
  usu_identificacion?: string;
  usu_nombres?: string;
  usu_apellidos?: string;
  usu_perfil?: string;
  usu_telefono?:string;
  usu_facebook?:string;
  usu_instagram?:string;
  usu_logo?:string;
  usu_pais?:string;
  usu_fk_empresa_socio?:string;
  usu_descrip_profesional?:string;
  link_pago_mes?:string;
  link_pago_trimestre?:string;
  link_pago_semestre?:string;
  plan_mes?:string;
  pla_mes_benef1?:string;
  pla_mes_benef2?:string;
  pla_mes_benef3?:string;
  plan_semestre?:number;
  pla_sem_benef1?:string;
  pla_sem_benef2?:string;
  pla_sem_benef3?:string;
  plan_year?:number;
  pla_anu_benef1?:string;
  pla_anu_benef2?:string;
  pla_anu_benef3?:string;
  plan_bienvenida?:string;
  vip?:boolean;
  usu_videoB?:string;
}

export interface ResLogin {
  status: boolean;
  token: string;
  user: User;
  instructor: Instructor;
  mensaje?:string;
}


export interface Like {
  like_id: string;
  like_fk_idactor: string;
  like_fk_usuario: string;
  like_tipo: string;
  usu_id: string;
  usu_identificacion: string;
  usu_nombres: string;
  usu_apellidos: string;
  usu_email: string;
  usu_textoclaro: string;
  usu_password: string;
  usu_perfil: string;
  usu_estado: string;
  usu_cod_verificacion: string;
  usu_estado_verificacion: string;
  usu_cod_contrasena: string;
}

export interface Gimnasio {
  gim_id: string;
  gim_nombre: string;
  gim_nit: string;
  gim_pais: string;
  gim_ciudad: string;
  gim_email: string;
  gim_telefono: string;
  gim_descripcion: string;
  gim_facebook?: string;
  gim_instagram?: string;
  gim_mapa: string;
  gim_ruta: string;
  gim_estado: string;
  gim_foto1: string;
  gim_foto2: string;
  gim_foto3: string;
  gim_foto4: string;
  gim_foto5: string;
  gim_likes: number;
  instructores: Instructor[];
  likes?: Like[];
  verlike?: boolean;
}

export interface Sedes {
  sed_id: string;
  sed_nombre: string;
  sed_pais: string;
  sed_ciudad: string;
  sed_email: string;
  sed_telefono: string;
  sed_facebook: string;
  sed_instagram: string;
  sed_direccion: string;
  sed_mapa: string;
  sed_ruta: string;
  sed_estado: string;
  sed_foto1: string;
  sed_foto2: string;
  sed_foto3: string;
}


export interface RespGimnasios {
  lista: Gimnasio[];
  ok: boolean;
  pag_actual: number;
  cant_pag: number;
}

export interface Pago {
  pag_id: string;
  pag_fk_usuario: string;
  pag_fecha: string;
  pag_fk_clase: string;
  pag_valor: string;
  pag_ref_transaccion: string;
  pag_estado: string;
  clas_id: string;
  clas_nombre: string;
  clas_descripcion: string;
  clas_fecha_inicio: string;
  clas_hora: string;
  clas_fk_instructor: string;
  clas_fk_curso: string;
  clas_tipo: string;
  clas_enlace: string;
  clas_estado: string;
  clas_valor: string;
  usu_id: string;
  usu_identificacion: string;
  usu_nombres: string;
  usu_apellidos: string;
  usu_email: string;
  usu_textoclaro: string;
  usu_password: string;
  usu_perfil: string;
  usu_estado: string;
  usu_cod_verificacion: string;
  usu_estado_verificacion: string;
  usu_cod_contrasena: string;
}

export interface ResultPagos{
  ok?: true;
  lista?: Pago[];
  pagActual?: number;
  cantPag?: number;
}

export interface ResultProducto{
  ok: true;
  producto: Pago[];
}


export  interface Productos{
  pro_id:number;
  pro_fk_usuario: number;
  pro_nombre: string;
  pro_descripcion: string;
  pro_referencia: number;
  pro_cantidad: number;
  pro_fechaCreacion:string;
  pro_precio:number;
  pro_estado:number;
  pro_foto1:string;
  pro_foto2:string;
  pro_foto3:string;
  usu_id: string;
  usu_identificacion: string;
  usu_nombres: string;
  usu_apellidos: string;
  usu_email: string;
  usu_perfil: string;
  usu_estado: string;
  usu_pais: string;
}

export interface Usuario{
  usu_id: number;
  usu_identificacion: number;
  usu_nombres: string;
  usu_apellidos: string;
  usu_descrip_profesional: string;
  usu_email: string;
  usu_textoclaro: string;
  usu_password: string;
  usu_perfil: number;
  usu_pais: string
  usu_estado: number;
  usu_cod_verificacion: string;
  usu_estado_verificacion: number;
  usu_cod_contrasena: string;
  usu_epayco?: string;
  usu_apikey?: string;
  usu_merchantid?: string;
  link_pago_mes?: string;
  link_pago_trimestre?: string;
  link_pago_semestre?: string;
  usu_logo?: string;
  usu_telefono?: string;
  usu_facebook?:string;
  usu_instagram?:string;
  fk_curso?:number;
  usu_videoB?:string;

}

export interface RespUsuario{
  ok?: true;
  lista?: Usuario[];
  pag_actual?: number;
  cant_pag?: number;
}

export interface NewProducto{
  producto:{};
  cantidad:number;
  id:number
}

export interface Planes{
  pla_id:number;
  pla_fk_aliado:number;
  plan_bienvenida:string;
  plan_mes:string;
  pla_mes_benef1:string;
  pla_mes_benef2:string;
  pla_mes_benef3:string;
  plan_semestre:number;
  pla_sem_benef1:string;
  pla_sem_benef2:string;
  pla_sem_benef3:string;
  plan_year:number;
  pla_anu_benef1:string;
  pla_anu_benef2:string;
  pla_anu_benef3:string;
}

export interface ClaAliad{
  claA_id:number;
  clasA_nombre:string;
  claA_descrip:string;
  claA_fk_aliado:number;
  claA_fecha_proga:string;
  claA_hora_proga:string;
  claA_fecha_creacion:string;
  calA_estado:number;
}

export interface Videos{
  vid_id:number;
  vid_titulo:string;
  vid_descripcion:string;
  vid_fk_aliado:number;
  vid_fecha_creacion:string;
  vid_ruta:string;
  vid_estado:number;
}

export interface ListAlumnos{
  id_reg:number;
  alumno:number;
  aliado:number;
  id:number;
  nombres: string;
  apellidos: string;
  email: string;
  pais: string;
  facebook:string,
  instagram:string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface Resp_produc_proces{
  cantidad: number;
  id_pro: number;
  name_pro: number;
  precio: number;
  valor_total: number;
}

export interface AlumnosInscritos{
  nombres: string;
  apellidos: string;
  email: string;
  fch_ini: string;
  fch_fin: string;
}

export interface Paises{
  id: number;
  iso: string;
  nombre : string;
  sigla : string;
  flag : string;
}

export interface RespuestaPaises {
  lista: Paises[];
  ok: boolean;
}

export interface Socios{
  soc_id: number;
  soc_nombre: string;
  soc_descripcion:string;
  soc_color_primario : string;
  soc_color_secundario: string;
  soc_pais:string;
  soc_telefono:string;
  soc_facebook:string;
  soc_instagram:string;
  soc_email:string;
  soc_pagina:string;
  soc_ft1:string;
  soc_ft2:string;
  soc_ft3:string;
  soc_ft4:string;
  soc_codigo : string;
}

export interface Emp_socio{
  id_emps: number;
  imps_nombre: string;

}

export interface Examen{
  id_examen: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  numero_preguntas: number;
  num_preg_aprobar:number;
  estado:number;
  status_edit:number;
  duracion:number;
  tipo_examen:number;
}

export interface Pregunta{
  id_pregunta: number;
  fk_examen: number;
  numero_pregunta: number;
  enunciado: string;
  tipo_pregunta: number;
}

export interface Respuesta{
  id_respuesta: number;
  fk_pregunta: number;
  fk_examen:number;
  orden: number;
  texto_respuesta: string;
  fk_tipo_preg: string;
}

export interface Resultados{
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  fecha_plazo: string;
  fecha_caducidad: string;
  fecha_nota: boolean;
  culitativo:string
}

export interface alumRecuperta{
  id: string;
  nombre_examen:string
  alumno: string;
  aliado: string;
  email: string;
  fecha: string;

}

export interface info_detalle{
  alumno: string;
  examen: string;
  fecha_finalizacion : string;
  fecha_limite : string;
  inicio : string;
  nota:number;
  cuantitativa:string;
}

export interface detalle_preg{
  calificacion: string;
  enunciado: string;
  fk_estado : number;
  fk_examen : number;
  id_pregunta : number;
  numero_pregunta : number;
  resp_alumno : string;
  resp_true : string;
  tipo_pregunta:string

}

export interface Trabajo{
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  ruta_arch: string;
  estado:number;
  tipo_doc:number;

}

export interface TrabajoRespuesta{
  id_trabajo:number;
  nombre_trabajo:string;
  alumno:string;
  comentario:string;
  link:string;
  fecha:string;
  ruta: string;
}

export interface Carreras{
  id:number;
  nombre:string;
  fecha_creacion:string;
  puntaje:string;
  estado:string;
  
}

