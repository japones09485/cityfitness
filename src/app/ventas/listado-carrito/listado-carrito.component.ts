import { Component, OnInit } from '@angular/core';
import { NewProducto } from '../../interfaces/interfaces';
import { VentasService }  from '../../services/ventas.service';
import { Resp_produc_proces } from '../../interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado-carrito',
  templateUrl: './listado-carrito.component.html',
  styleUrls: ['./listado-carrito.component.css']
})
export class ListadoCarritoComponent implements OnInit {
  
  constructor(private ApiAlid: VentasService,
              private router:Router,
              private fb: UntypedFormBuilder
              ) { }

  ProdCreator:UntypedFormGroup;
  frmGuardar = new FormData();
  listCarProd:NewProducto[] = [];
  productos = [];
  datosenvio = []; 
  pro_aux= [];
  setlocal= false;
  objectKeys = Object.keys;
  datosKey = Object.keys;

  ngOnInit(): void {
    this.actualizarProductos();
   
  }
  
  actualizarProductos(){
    this.listCarProd = JSON.parse( localStorage.getItem('productos'));
    if(this.listCarProd.length == 0){
      this.setlocal = true;
    }
    this.ApiAlid.procesarProductos( this.listCarProd)
    .subscribe((data:any)=>{
        this.productos = data.productos;
        this.datosenvio = data.datosenvio;
      
    });
   
    
  }

  eliminarProducto(aliado:number, id_localstorage:number){
  this.listCarProd = JSON.parse( localStorage.getItem('productos'));
  this.listCarProd.splice( id_localstorage, 1 );
  localStorage.setItem('productos', JSON.stringify( this.listCarProd)); 
  this.actualizarProductos();
 }

 masProductos(){
  this.router.navigate(['tienda']);
 }

 inicioAlgo(){
   console.log('japones');
   
 }


  
}
