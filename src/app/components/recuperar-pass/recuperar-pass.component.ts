import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {
  frmLg: UntypedFormGroup;
  mensaje:string;
  statusmsj = false;
  constructor(  public router: Router,
    private fb: UntypedFormBuilder,
    private apiAuth: AuthService,
    private api: ApiRestService) { }
    

  ngOnInit(): void {
    this.frmLg = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar_contra(){
    let email = this.frmLg.value.usuario;
   this.api.olvidaste_contra(email)
   .subscribe((res:any)=>{
   this.mensaje = res.mensaje;
   this.statusmsj = true;
   setTimeout(() => {
    this.statusmsj = false;
   }, 3000);
   })
    
  }

}
