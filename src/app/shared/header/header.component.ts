import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, ResLogin, NewProducto,Instructor } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  frmUser: UntypedFormGroup;
  user: User;
  Instructor: any;
  LogIn: string;
  carrito: any =[];
  totCarrito:number;
  empSocio:number;
  validIns = false;
  constructor(
    public apiAuth: AuthService,
    private fb: UntypedFormBuilder,
    private api: ApiRestService,
    private router: Router,
    private ventaService: VentasService
  ) {
    this.totProdCarrito();
    this.user = this.apiAuth.getUser();
  }

  ngOnInit(): void {
    this.LogIn = sessionStorage.getItem('token');
    this.carrito = localStorage.getItem('productos');
    this.empSocio =JSON.parse( sessionStorage.getItem('id_empresasSoc'));
    this.Instructor = JSON.parse(sessionStorage.getItem('instructor'));
    if (this.Instructor !== null && this.Instructor.ins_id) {
      this.validIns = true;
    }
    this.frmUser = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(5)]],
      perfil: '2'
    });
  }

  logIn() {
    this.apiAuth.logInFront(this.frmUser.value)
      .subscribe((res: ResLogin) => {
        if (res.status === true) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('user', JSON.stringify(res.user));
          sessionStorage.setItem('instructor', JSON.stringify(res.instructor));
          this.apiAuth.setUser(res.user);
          this.user = res.user;

        } else {
          this.api.mensajeUser = 'Error en credenciales de acceso, verifique su correo o contraseña o Registrese en nuestra plataforma.';
          this.api.mostrarMsj = true;
        }
        this.ngOnInit();
        this.frmUser.reset();
        this.router.navigateByUrl('/home');
      });
  }

  getOut() {
    this.apiAuth.logOut();
    this.user = null;
    this.ngOnInit();
    this.validIns = false;
    this.router.navigateByUrl('/home');

  }

  totProdCarrito() {
    let locals:[] = JSON.parse(localStorage.getItem('productos'));
    if(locals){
      this.totCarrito = locals.length;
    }else{
      this.totCarrito = 0;
    }

  }

}
