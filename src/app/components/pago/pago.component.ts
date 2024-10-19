import { Component, OnInit, Input, Inject } from '@angular/core';
import { Clase, User } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRestService } from 'src/app/services/api-rest.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

declare var ePayco: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  ePayco: any;
  clase: Clase = {}; // Objeto de clase

  key = environment.pKeyEpayco;
  data: any;
  handler: any;
  dataUserPay = {
    idclase: '',
    nombreuser: '',
    mailuser: '',
    descripcion: ''
  };

  populateData = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private acRouter: ActivatedRoute,
    private api: ApiRestService,
    private router: Router,
    public apiAuth: AuthService
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.handler = ePayco.checkout.configure({
      key: this.key,
      test: false,
    });

    this.acRouter.params.subscribe(param => {
      this.api.getClase(param.id)
        .subscribe((res: any) => {
          this.clase = res.data;
          this.dataUserPay.idclase = this.clase.clas_id;
          this.dataUserPay.descripcion = this.clase.cur_nombre;
          if (this.apiAuth.user){
            this.data = {
              // Parametros compra (obligatorio)
              name: this.clase.clas_nombre,
              description: this.clase.clas_descripcion,
              currency: 'usd',
              amount: this.clase.clas_valor,
              country: 'co',
              lang: 'es',
              // Onpage='false' - Standard='true'
              external: 'false',
              // Atributos opcionales
              confirmation: 'https://cityfitnessworld.com/payment/response',
              response: 'https://cityfitnessworld.com/#/confirmacion',
              // Atributos cliente
              extra1: this.clase.clas_id,
              extra2: this.dataUserPay.nombreuser,
              extra3: this.dataUserPay.mailuser,
              extra4: this.apiAuth.user.usu_id
            };
          }
        });
    });
  }

  pagar() {
    this.handler.open(this.data);
  }
}
