import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Instructor } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-hojavida',
  templateUrl: './hojavida.component.html',
  styleUrls: ['./hojavida.component.css']
})
export class HojavidaComponent implements OnInit {

  $: any;
  @Input() instructor: Instructor;
  @Output() finalizar = new EventEmitter<boolean>();
  pathIm = environment.pathImgs;
  constructor() { }
  ngOnInit(): void {
    $('#modalHojadeVida').modal();
    $('#modalHojadeVida').on('hidden.bs.modal', () => {
      this.finalizar.emit(false);
    });
    console.log(this.instructor);
  }
}
