import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/interfaces'
import { UntypedFormGroup,UntypedFormBuilder,Validators } from '@angular/forms';
import { environment } from '../../../environments/environment'
import { ApiRestService } from 'src/app/services/api-rest.service';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto:any = {};
  ProdEditar:UntypedFormGroup;
  frmEditar = new FormData();
  flagSave:boolean;
  flagGuardado:boolean;
  pathIm = environment.pathImgs;
  user: User;
  constructor(private router: Router, 
              private Activated: ActivatedRoute,
              private ventaService:VentasService,
              private fb: UntypedFormBuilder,
              private authApi: AuthService
              ) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.flagSave = false;
    this.flagGuardado = false;
    this.Activated.params.subscribe(param =>{
        this.ventaService.traerId(param.id)
        .subscribe(resp =>{
          this.producto = resp['producto'];
          this.inicializarForm();
        })
    });

    this.inicializarForm();
  }

  inicializarForm() {
    this.ProdEditar = this.fb.group({
      nombre: [this.producto.pro_nombre, Validators.required],
      descripcion: [this.producto.pro_descripcion, Validators.required],
      referencia: [this.producto.pro_referencia, Validators.required],
      cantidad: [this.producto.pro_cantidad, Validators.required],
      precio: [this.producto.pro_precio, Validators.required],
      usuario: this.user.usu_id
    });
  }


  editarProducto(){
    this.flagSave = true;
    const payload = {
      id_edit: this.producto.pro_id,
      data: this.ProdEditar.value
    };

   this.frmEditar.append('data', JSON.stringify(payload));
   this.ventaService.editarProducto(this.frmEditar)
    .subscribe((res:any)=>{
      if(res['ok']==true){
        this.flagSave = false;
        this.flagGuardado = true;
        this.producto = res['data'];
        setTimeout(() => {
          this.flagGuardado = false;
        }, 4000);
      }
    })
  }  

  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmEditar.append(`${numImg}`, imgs.files[0]); 
      
    }
  }


}
