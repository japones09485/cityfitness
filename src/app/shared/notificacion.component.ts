import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';

declare var $: any;

@Component({
  selector: 'app-notificacion',
  template: `
  <div class="modal fade" id="mensajeAlert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Mensaje usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="text-danger">{{serv.mensajeUser}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block" (click)="cerrarMensaje()" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class NotificacionComponent implements OnInit, OnDestroy {

  constructor(public serv: ApiRestService) { }

  ngOnInit(){
    $('#mensajeAlert').modal();
    setTimeout(() => {
      this.serv.mostrarMsj = false;
    }, 5000);
  }

  ngOnDestroy(){
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('#loadinModal').modal('hide');
  }

  cerrarMensaje(){
    this.serv.mostrarMsj = false;
  }

}
