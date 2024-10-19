import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-websocios-instructores',
  templateUrl: './front-websocios-instructores.component.html',
  styleUrls: ['./front-websocios-instructores.component.css']
})
export class FrontWebsociosInstructoresComponent implements OnInit {
  usuarios: any;
  emp_logo:string;
  emp_nombre:string;
  codigo:string;
  pathIm = environment.pathImgs;
  constructor(private api: ApiRestService,
              private acRouter: ActivatedRoute,
              private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.api.traeraliadosXempresa(param.id)
      .subscribe((res:any)=>{
        this.usuarios = res.usuarios;
        this.emp_nombre = this.usuarios[0]['imps_nombre'];
        this.emp_logo = this.usuarios[0]['imps_foto1'];
        this.codigo = this.usuarios[0]['soc_codigo'];
      });

    });
  }

}
