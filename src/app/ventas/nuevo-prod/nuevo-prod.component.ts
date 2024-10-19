import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { VentasService } from 'src/app/services/ventas.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevo-prod',
  templateUrl: './nuevo-prod.component.html',
  styleUrls: ['./nuevo-prod.component.css']
})
export class NuevoProdComponent implements OnInit {
  ProdCreator:UntypedFormGroup;
  frmGuardar = new FormData();
  flagSave:boolean;
  flagGuardado:boolean;
  pathIm = environment.pathImgs;
  user: User;
  constructor(public api: VentasService,
              private fb: UntypedFormBuilder,
              private authApi: AuthService) { }

  ngOnInit(): void {
    this.user = this.authApi.getUser();
    this.flagSave = false;
    this.flagGuardado = false;
    this.inicializarForm();
  }


  inicializarForm() {
    this.ProdCreator = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      referencia: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      usuario: this.user.usu_id
    });
  }

  crearProducto(){
    this.flagSave = true;
    this.frmGuardar.append('data', JSON.stringify(this.ProdCreator.value));
    this.api.guardarProducto(this.frmGuardar)
    .subscribe((data:any)=>{
      if(data.ok == true){
        this.ProdCreator.reset();
        this.flagGuardado = true;
        this.flagSave = false;
        setTimeout(() => {
            this.flagGuardado = false;
        }, 5000);
      }
      
    });
    
  }

  agregarArchivo(event: any, numImg: number) {
    const imgs: any = event.target;
    if (imgs.files.length > 0) {
      this.frmGuardar.append(`${numImg}`, imgs.files[0]); 
    }
  }

}
