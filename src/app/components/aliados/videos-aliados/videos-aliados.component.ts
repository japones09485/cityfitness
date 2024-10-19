import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliadosService } from '../../../services/aliados.service';
import  { User, Videos } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-videos-aliados',
  templateUrl: './videos-aliados.component.html',
  styleUrls: ['./videos-aliados.component.css']
})
export class VideosAliadosComponent implements OnInit {
  pathIm = environment.pathImgs;
  videos: Videos[] = [];
  idAliado:number;
  bienvenida=false;
  usuario:User;
  videobienvenida:String;

  constructor(private acRouter:ActivatedRoute,
    private api:AliadosService,
    private router: Router,
    private _sanitizer: DomSanitizer
) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
        if(param.empresasocio){
          this.bienvenida = true;
          this.api.TraerxId(param.id)
          .subscribe((data:any)=>{
            this.usuario = data.usuario;
          });
        }
        this.api.listarVid(param.id)
          .subscribe((data: any) => {
            this.videos = data.lista;
            this.idAliado = param.id;

          });

    });
  }

  pag_principal(idAliado){
    this.router.navigate( ['aliados/FanPag/'+ idAliado]);
  }

  getURL(url) {

       return this._sanitizer.bypassSecurityTrustResourceUrl(url);
 }


}
