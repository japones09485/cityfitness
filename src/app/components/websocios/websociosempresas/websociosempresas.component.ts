import { Component, OnInit } from '@angular/core';
import { Socios, User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-websociosempresas',
  templateUrl: './websociosempresas.component.html',
  styleUrls: ['./websociosempresas.component.css']
})
export class WebsociosempresasComponent implements OnInit {

  user:any;
  empresas:any;
  color1:string;
  pathIm = environment.pathImgs;
  socio:any;
  nomsocio:string;
  constructor( private apiAuth:AuthService,
               private router: Router,
               private api: ApiRestService) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();
    console.log(this.user);


    this.api.traerIdSocio(this.user.usu_fk_socio)
    .subscribe((res:any)=>{
      this.socio = res.socio;
      this.nomsocio = this.socio.soc_nombre;
    });
    this.api.EmpreporUsu(this.user.usu_fk_socio)
      .subscribe((res:any)=>{
          this.empresas = res.empresas;
      })
    }

    getOut(){
      this.apiAuth.logOut();
      this.user = null;
      this.router.navigateByUrl('/websociosinicio');
    }
}
