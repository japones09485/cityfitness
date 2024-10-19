import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Videos, User } from 'src/app/interfaces/interfaces';
import { AliadosService } from '../../../services/aliados.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: Videos[] = [];
  user: User = {};
  mensaje = 'Desea eliminar este video?';
  pathImg = environment.pathVideos;
  sucessvideo: boolean;
  flagSave = false;
  eliminado = true;


  constructor(private router: Router,
    private apiAlid: AliadosService,
    private authservice: AuthService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sucessvideo = false;
    this.user = this.authservice.getUser();
    this.apiAlid.listarVidAll(this.user.usu_id)
      .subscribe((res: any) => {
        if (res.sucess == true) {
          this.videos = res.lista;
          console.log(this.videos);
        }
      });
  }

  nuevoVideo() {
    this.router.navigate(['adminAlid/newvideo']);
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
          this.router.navigate(['adminAlid/videos']);
        }

      });
  }
}
