import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from '../../services/auth.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Productos,RespuestaPaises,Paises } from '../../interfaces/interfaces'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {User} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto: any = {};
  productos: Productos[] = [];
  pathImg = environment.pathImgs;
  img1: boolean;
  img2: boolean;
  img3: boolean;
  imagePr: string;
  cantProd: number;
  agregarCar: boolean;
  LogUser:boolean;
  totCarrito: number;
  paises: Paises[] = [];
  nombrePais:String;
  alumnoLog: User = {};
  user: User;
  
  constructor(private activatedRoute: ActivatedRoute,
    private apiVentas: VentasService,
    private apiAuth: AuthService,
    private api: ApiRestService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();
    this.img1 = false;
    this.img2 = true;
    this.img3 = true;
    this.LogUser = false;
    this.agregarCar = false;
    this.totProdCarrito();
    this.alumnoLog = this.apiAuth.getUser();
    
    this.apiVentas.listarActivos()
      .subscribe((res: any) => {
        this.productos = res.lista
      })
    this.activatedRoute.params.subscribe(params => {
      this.apiVentas.traerId(params['id'])
        .subscribe((data: any) => {
          this.producto = data.producto;
          this.imagePr = this.producto.pro_foto1;
        })
    });

    this.api.getPaises()
    .subscribe((res:RespuestaPaises)=>{
      this.paises = res.lista
    });

  }

  changeImg(foto) {
    switch (foto) {

      case this.producto.pro_foto1:
        this.img1 = false;
        this.img2 = true;
        this.img3 = true;
        break;

      case this.producto.pro_foto2:
        console.log('dos');

        this.img2 = false;
        this.img1 = true;
        this.img3 = true;
        break;
  
      case this.producto.pro_foto3:
        this.img3 = false;
        this.img1 = true;
        this.img2 = true;
        break;
    }
    this.imagePr = foto;
  }

  moreProd() {
    this.router.navigate(['/tienda']);
  }

  agregarCarrito(producto, event) {
    if(this.apiAuth.user){
      if (!this.cantProd) {
        this.cantProd = 1;
      }
  
      let new_product = {
        producto: producto,
        cantidad: this.cantProd
      }
      let exito: boolean;
      exito = this.apiVentas.setCarrito(new_product)
      if(exito){
        this.agregarCar=true;
      }
      this.totProdCarrito();  
    }
    
  }

  totProdCarrito() {
    let locals:[] = JSON.parse(localStorage.getItem('productos'));
    if(locals){
      this.totCarrito = locals.length;
    }else{
      this.totCarrito = 0;
    }
 
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathImg +'imagenes/paises/'+ infopais;
     return flagPais;
   }

}
