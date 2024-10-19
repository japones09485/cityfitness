
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Videos, User } from 'src/app/interfaces/interfaces';
import { AliadosService } from '../../services/aliados.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-videosempresa',
  templateUrl: './videosempresa.component.html',
  styleUrls: ['./videosempresa.component.css']
})
export class VideosempresaComponent implements OnInit {
  videos: Videos[] = [];
  user: User = {};
  mensaje = 'Desea eliminar este video?';
  pathImg = environment.pathVideos;
  sucessvideo: boolean;
  flagSave = false;
  eliminado = true;
  id_empresa:number;

  constructor(private router: Router,
    private apiAlid: AliadosService,
    private authservice: AuthService,
    private _sanitizer: DomSanitizer,
    private acRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sucessvideo = false;
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
        this.apiAlid.listarVidAll(this.id_empresa)
      .subscribe((res: any) => {
        if (res.sucess == true) {
          this.videos = res.lista;
          console.log(this.videos);
        }
      });
    }); 

    
    this.user = this.authservice.getUser();
  }


  editar(video: Videos) {
    console.log(video);

  }

  getURL(url) {
    
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);   
}

  deletevideo(id: number) {

    this.apiAlid.deletevideo(id)
      .subscribe((res: any) => {
        if (res.sucess == true) {
          this.mensaje = res.mensaje;
          this.videos = res.lista;
          this.router.navigate( ['videosempresa/',this.id_empresa] );
        }

      });
  }
}
