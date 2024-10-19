import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit, DoCheck {

  @Input() nPaginas: number;
  @Output() irPagina = new EventEmitter<number>();
  numberPags = [];
  constructor() { }

  ngOnInit(): void {
    this.numberPags = new Array(this.nPaginas);
  }

  ngDoCheck(){
    this.numberPags = new Array(this.nPaginas);
  }

}
