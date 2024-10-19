import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ApiRestService } from '../../../services/api-rest.service';
@Component({
  selector: 'app-video-b',
  templateUrl: './video-b.component.html',
  styleUrls: ['./video-b.component.css']
})
export class VideoBComponent implements OnInit {
  url:string;

  constructor( private acRouter: ActivatedRoute,
               private _sanitizer: DomSanitizer,
               public api: ApiRestService) { }

  ngOnInit(): void {

    this.acRouter.params.subscribe(param => {


      this.api.videoB(param.id)
      .subscribe((res:any)=>{
        this.url = res.url;

        console.log(this.url);



      })

   });

  }

  getURL(url) {

    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
}


}
