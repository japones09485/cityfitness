import { Component, OnInit, Inject } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  refPayco = '';
  transactionResponse: any;
  responses = {
    1: 'Aceptada',
    2: 'Rechazada',
    3: 'Pendiente',
    4: 'Fallida',
    5: 'Reversada',
    6: 'Retenida',
    7: 'Iniciada',
    8: 'Expirada',
    9: 'Abandonada',
    10: 'Cancelada',
    11: 'Antifraude'
  };


  constructor(
    private api: ApiRestService,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    const overlay = document.getElementById('overlay-epayco');
    const checkout = document.getElementById('checkout-epayco');

    if (overlay && checkout) {
      overlay.classList.add('animate__fadeOut');
      overlay.classList.add('fade');
      checkout.classList.add('animate__fadeOut');
      checkout.classList.add('fade');
      setTimeout(() => {
        checkout.remove();
        overlay.remove();
      }, 300);
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.refPayco = params.ref_payco || params.x_ref_payco;
    });
    this.api.getResponsePayment(this.refPayco)
      .subscribe((data: any) => {
        this.transactionResponse = data.data;
        console.log(JSON.parse(this.transactionResponse.x_description));
        console.log(this.responses[this.transactionResponse.x_cod_transaction_state]);
        console.log(this.transactionResponse);
      });
  }
}
