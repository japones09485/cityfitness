import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ResLogin } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  frmLg: UntypedFormGroup;
  user:any;
  constructor(
    public router: Router,
    private fb: UntypedFormBuilder,
    private apiAuth: AuthService,
    private api: ApiRestService) {
  }

  async ngOnInit() {
    this.frmLg = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', Validators.required],
      perfil: ['', Validators.required],

    });

  }


  acceso(){
  this.apiAuth.iniciar(this.frmLg.value)
      .subscribe( (res: ResLogin)  => {

        if (res.status === true) {

          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('user', JSON.stringify(res.user));
          this.apiAuth.setUser(res.user);
          this.user = res.user;
          if(this.user.usu_perfil == 1){
            this.router.navigate(['admin/recursoshumanos']);
          }else if(this.user.usu_perfil == 3){
            this.router.navigate(['ventas/productos']);
          }else if(this.user.usu_perfil == 4){
            this.router.navigate(['adminAlid']);
          }else if(this.user.usu_perfil == 5){
            this.router.navigate(['adminAlid']);
          }else if(this.user.usu_perfil == 6){
            this.router.navigate(['adminAlid']);
          }

        } else {
          this.api.mensajeUser = res.mensaje;
          this.api.mostrarMsj = true;
        }
        this.frmLg.reset();
      });
  }

}
