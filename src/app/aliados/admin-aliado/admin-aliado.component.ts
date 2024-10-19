import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-aliado',
  templateUrl: './admin-aliado.component.html',
  styleUrls: ['./admin-aliado.component.css']
})
export class AdminAliadoComponent implements OnInit {
  confAlid:boolean;
  constructor() { }

  ngOnInit(): void {
    this.confAlid = true;
  }

}
