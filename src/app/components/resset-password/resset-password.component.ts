import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ApiRestService } from 'src/app/services/api-rest.service';
import  { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-resset-password',
  templateUrl: './resset-password.component.html',
  styleUrls: ['./resset-password.component.css']
})
export class RessetPasswordComponent implements OnInit {

  statusmsj:boolean;
  mensaje:string;
  frmLg: UntypedFormGroup;
  frmGuardar = new FormData();
  user:User;

  constructor(public router: Router,
    private fb: UntypedFormBuilder,
    private AuthApi: AuthService,
    private acRouter: ActivatedRoute,
    private api: ApiRestService) { }

  ngOnInit(): void {
    this.frmLg = this.fb.group({
      password: ['', Validators.required],
      verifiPass: ['', Validators.required],
    }, {validator: this.checkPasswords}); 
    this.statusmsj = false;
  }

  resset_contra(){

    this.acRouter.params.subscribe(param => {
  const payload = {
    id: param.id,
    password: this.frmLg.value.password
  };

        this.AuthApi.ressetPassword(payload)
        .subscribe((res: any) => {
          this.mensaje = res.mensaje;
          this.statusmsj = res.response;
          setTimeout(() => {
            this.statusmsj  = false;
            this.router.navigate( ['home'] );
          }, 4000);
        });
        
      });  
   
  }

  checkPasswords(group: UntypedFormGroup){
    const pass = group.get('password').value;
    const confirmPass = group.get('verifiPass').value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
