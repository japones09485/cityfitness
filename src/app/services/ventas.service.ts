import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NewProducto } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private urlAPI = environment.apiURL;
  private carrito:NewProducto[] = [];
  constructor( private http: HttpClient,private apiAuth: AuthService) { }

  guardarProducto(payload: any) {
    return this.http.post(this.urlAPI + `Rest_productos/crear`, payload);
  }

  editarProducto(payload:any) {
    return this.http.post(this.urlAPI + `Rest_productos/editarProducto`, payload);
  }

  listarActivos(pagina?: number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.get( this.urlAPI+ `Rest_productos/listarActivos?pagina=${pagina}`);
  }

  listarAll(pagina?:  number){
    if(pagina === undefined){
      pagina = 1
    }
    return this.http.get( this.urlAPI+ `Rest_productos/listarAll?pagina=${pagina}`);
  }


  misProductos(usuario: number, pagina?: number) {
    return this.http.post(this.urlAPI + `Rest_productos/misProductos?pagina=${pagina}`, { usuario: usuario });
  }

  traerId(id: number) {
    return this.http.post(this.urlAPI + `Rest_productos/traerId`, { id });
  }

  buscarProductos(filtros: any){
    let strGET = '?';
    strGET += filtros.nameSearch.length > 0 ? `nombre=${filtros.nameSearch}` : '';
    return this.http.get(this.urlAPI + `Rest_productos/filtrar${strGET}`);
  }

  setCarrito( producto:any ){
    this.carrito.push(producto);
    localStorage.removeItem('productos');
    localStorage.setItem('productos', JSON.stringify(this.carrito));
    return true;
  }

  procesarProductos(productos: any){
    return this.http.post(this.urlAPI + `Rest_productos/procesarProductos`, productos );
  }

  finalizarCompra(datosPayu:any){
    return this.http.post(this.urlAPI + `Rest_productos/finalizarCompra`, datosPayu );
  }

  
}


