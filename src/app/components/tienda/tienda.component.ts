import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Productos,Paises,RespuestaPaises} from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';
import {User} from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: Productos[] = [];
  pathImg = environment.pathImgs;
  carrito:any;
  failResult:boolean;
  cantPaginas:number;
  paises: Paises[] = [];
  nombrePais:String;
  user: User;
  filts = {
    nameSearch: ''
  };
  constructor( private api : VentasService, private router:Router,private apiAuth: AuthService, public apip: ApiRestService) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();

    this.carrito = localStorage.getItem('productos');
    this.failResult = false;
    this.api.listarActivos()
    .subscribe((res:any)=>{
      this.productos = res.lista
      this.cantPaginas = res.cant_pag;
    });

    this.apip.getPaises()
      .subscribe((res:RespuestaPaises)=>{
        this.paises = res.lista
      });

  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

  TraerId(id:number){
   this.api.traerId(id)
   .subscribe((res:any)=>{
    if(res.ok == true ){
      this.router.navigate( ['/producto',id] );
    }
   })
  }

  buscarProducto(){
    this.api.buscarProductos(this.filts)
    .subscribe((res: any) => {
      if(res.ok == true){
        this.productos = res.lista;
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

  banderaInstructor(bandera: string) {
    const country = this.apip.paises.find(pais => pais.alpha3Code === bandera);
    return country.flag;
  }

}
