import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliadosService } from '../../services/aliados.service';
import   '../../../../src/assets/js/external_api';
import { AuthService } from '../../services/auth.service';
import  { User } from '../../interfaces/interfaces';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.css']
})
export class ConferenciaComponent implements OnInit {
  jitsi: any;
  optionjitsi: any;
  domain: string;
  user: User;
  constructor(private activatedRoute:ActivatedRoute,
              private apiAlid: AliadosService,
              private apiAuth: AuthService ) { }

  ngOnInit(): void {
    this.user = this.apiAuth.getUser();
    this.activatedRoute.params.subscribe(params => {
      this.apiAlid.ClasexId(params.id)
      .subscribe((res:any)=>{
        this.iniciarjitsi(res.data.clasA_nombre,res.data.claA_id);
      });

    });
  }


  iniciarjitsi(name:string,id:number) {

    var namesala:string='cityfitness'+id+name;
    var nameAlumno = this.user.usu_nombres+' '+this.user.usu_apellidos;
    this.domain = 'meet.jit.si';
    this.optionjitsi = {
       roomName:namesala,
       width: 1100,
       height: 780,
       parentNode: document.querySelector('#meet'),
       userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: nameAlumno
    }
     };

     this.jitsi = new JitsiMeetExternalAPI(this.domain, this.optionjitsi);

   }

}
