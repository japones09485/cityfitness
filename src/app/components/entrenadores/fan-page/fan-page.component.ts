import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AliadosService } from '../../../services/aliados.service';
import { User, Usuario } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-fan-page',
  templateUrl: './fan-page.component.html',
  styleUrls: ['./fan-page.component.css']
})
export class FanPageComponent implements OnInit {
  aliado: User = {};
  pathIm = environment.pathImgs;
  constructor(private acRouter: ActivatedRoute,
    private api: AliadosService) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(param => {
      this.api.TraerxId(param.id)
        .subscribe((data: any) => {
          this.aliado = data.usuario;
        });
    });


  }

  iniciarreunion() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'JitsiMeetAPIExample',
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }
}
