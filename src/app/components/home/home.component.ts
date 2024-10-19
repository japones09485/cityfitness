import { Component, OnInit,ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Curso, Instructor, Sedes } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import 'slick-carousel';
import { Router } from '@angular/router';


// Declaration for method in JS OUT
declare function toDoBefore(): any;
declare var $: any; // Declara la variable global para jQuery
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listadoClases: Curso[] = [];
  frmContact: UntypedFormGroup;
  instructores: Instructor[] = [];
  pathImg = environment.pathImgs;
  envioEmail:boolean;
  sedes: Sedes[] = [];
  listadoCurso: Curso[] = [];
  foto1 = '';
  foto2 = '';
  foto3 = '';
  foto4 = '';

  constructor(
    public sanitizer: DomSanitizer,
    private api: ApiRestService,
    private fb: UntypedFormBuilder,
    private _config:NgbCarouselConfig,
    private el: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    sessionStorage.removeItem('empSocio');
    sessionStorage.removeItem('id_empresasSoc');

    this.initializeForm();
    this.envioEmail = false;
    this.api.getInstructoresFront()
    .subscribe((res: any) => {
      this.instructores = res.lista
    });

    this.api.getSedesFront()
    .subscribe((res:any)=>{
      this.sedes = res.lista;

    });


    this.api.getCursosFront()
      .subscribe((res: any) => {
        this.listadoCurso = res.lista;


    });

   // this.ngAfterViewInit();

  }

  ngAfterViewInit() {
    $(this.el.nativeElement).find('.slick-carousel').slick({
      // Configuración de Slick Carousel
      slidesToShow: 4,
      slidesToScroll: 1,
      // ... Opciones adicionales
    });
  }

  initializeForm() {

    this.frmContact = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  enviarCorreo() {
    this.api.sendContact(this.frmContact.value)
      .subscribe((data:any)=>{
        if(data.ok = true){
          this.envioEmail = true;
          this.frmContact.reset();
          setTimeout(() => {
              this.envioEmail = false;
          }, 3000);
        }
      });
  }

  irCurso(id_curso: number) {
    const url = '/#/clasesDetalle/' + id_curso;
    window.open(url, '_blank');
}



}
