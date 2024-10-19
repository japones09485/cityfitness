import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/interfaces'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Productos[] = [];
  flagGuardado: boolean;
  failResult: boolean;
  cantPaginas:number;
  user: User;
  vendedor: number;
  filts = {
    nameSearch: ''
  };
  pathImg = environment.pathImgs;
 
  constructor(private api: VentasService, 
              private router:Router,
              private authApi:AuthService ) { }
  
  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.failResult=false;
    this.vendedor = this.user.usu_id;
    this.api.misProductos( this.vendedor )
      .subscribe((res: any) => {
          this.productos = res.lista;
          this.cantPaginas = res.cant_pag;
      });
      
  }

  editProducto(id){
    this.api.traerId(id)
    .subscribe((res:any)=>{
     if(res.ok == true ){
       this.router.navigate( ['ventas/editProd',id] );
     }
    })
    
  }

  buscarProducto(){
    this.api.buscarProductos(this.filts)
    .subscribe((res: any) => { 
      if(res.ok == true){
        this.productos = res.lista; 
        console.log(this.productos);
        
      }else{
        this.failResult = true;
        setTimeout(() => {
          this.failResult = false
         }, 3000);
      }
    });
  }

  sigPag(pagina:number){
    this.api.listarActivos(pagina)
    .subscribe((res: any)=>{
      this.productos = res.lista;
      
    })
  }

}
