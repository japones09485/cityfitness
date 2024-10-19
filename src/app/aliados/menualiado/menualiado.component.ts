import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menualiado',
  templateUrl: './menualiado.component.html',
  styleUrls: ['./menualiado.component.css']
})
export class MenualiadoComponent implements OnInit {
  user:any;
  PerfilUsu : String;
  id_empresa: number;
  constructor(private autService:AuthService,
              private router:Router,
              private apiAuth: AuthService) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();
    this.PerfilUsu = this.user.usu_perfil;
    this.id_empresa =this.user.usu_id;

  }

  salir() {



    if(this.user.usu_fk_empresa_socio>0){

      this.autService.logOut();

      if(this.PerfilUsu == '5'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['websociosinicio']);
      }

    }else{
      this.autService.logOut();
      this.router.navigateByUrl('/home');
    }
  }

}
