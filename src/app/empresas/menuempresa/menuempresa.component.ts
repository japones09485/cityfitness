import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuempresa',
  templateUrl: './menuempresa.component.html',
  styleUrls: ['./menuempresa.component.css']
})
export class MenuempresaComponent implements OnInit {
  id_empresa: number;
  PerfilUsu :number;
  user:any;

  constructor(private apiAuth: AuthService,
                    private router:Router) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();
    this.PerfilUsu = this.user.usu_perfil;
    this.id_empresa =JSON.parse( sessionStorage.getItem('emp_actual'));

  }

  salir() {



    if(this.user.usu_fk_empresa_socio>0){

      this.apiAuth.logOut();

      if(this.PerfilUsu == 5){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['websociosinicio']);
      }

    }else{
      this.apiAuth.logOut();
      this.router.navigateByUrl('/home');
    }
  }

}
