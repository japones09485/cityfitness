import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ResLogin } from 'src/app/interfaces/interfaces';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-websociosinicio',
  templateUrl: './websociosinicio.component.html',
  styleUrls: ['./websociosinicio.component.css']
})
export class WebsociosinicioComponent implements OnInit {
  frmLg: UntypedFormGroup;
  user:any;
  constructor( public router: Router,
    private fb: UntypedFormBuilder,
    private apiAuth: AuthService,
    private api: ApiRestService) { }

    async ngOnInit() {
    this.frmLg = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', Validators.required],
      perfil: ['6', Validators.required],

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
            if(this.user.usu_fk_socio){
              this.router.navigate(['websociosempresas']);
            }else{
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
