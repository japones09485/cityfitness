import { Component, OnInit,Input } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder,Validators } from '@angular/forms';
import { AliadosService } from '../../services/aliados.service';
import { AuthService } from '../../services/auth.service';
import { User,Planes } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {
  
  user: User;
  confAlid:boolean;
  idAliado:number;
  bienvenida:string;
  frmAliad: UntypedFormGroup;
  preciomes: number;
  mes_ben1:string;
  mes_ben2:string;
  mes_ben3:string;
  preciosem: number;
  sem_ben1:string;
  sem_ben2:string;
  sem_ben3:string;
  precioanual: number;
  anu_ben1:string;
  anu_ben2:string;
  anu_ben3:string;
  fondo_img: string;
  flagSave:boolean;
  mensaje:string;
  banmsj:boolean;
  frmGuardar = new FormData();
  id_empresa:number;
  constructor(private fb:UntypedFormBuilder,
    private apiAuth:AuthService,
    private apiAliad:AliadosService,
    private router: Router,
    private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.fondo_img = 'assets/img/price-bg.jpg';
    this.confAlid = true;
    this.banmsj =  false;
    this.acRouter.params.subscribe(param => {
      this.id_empresa = param.id;
      
    });  
    
      this.apiAliad.getplanes( this.id_empresa)
      .subscribe((resp:any) =>{
     
        if(resp.sucess == true){
        this.bienvenida = resp['bienvenida'];
        this.preciomes = resp['mes'];
        this.mes_ben1 = resp['mes_ben1'];
        this.mes_ben2 = resp['mes_ben2'];
        this.mes_ben3 = resp['mes_ben3'];
        this.preciosem = resp['semestre'];
        this.sem_ben1 = resp['sem_ben1'];
        this.sem_ben2 = resp['sem_ben2'];
        this.sem_ben3 = resp['sem_ben3'];
        this.precioanual = resp['year'];
        this.anu_ben1 = resp['anu_ben1'];
        this.anu_ben2 = resp['anu_ben2'];
        this.anu_ben3 = resp['anu_ben3'];
        
      }    
      })
      this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.frmAliad = this.fb.group({
      bienvenida: ['', Validators.required],
      mensual: ['', Validators.required],
      mes_ben1: ['', Validators.required],
      mes_ben2: ['', Validators.required],
      mes_ben3: ['', Validators.required],   
      semestral: ['', Validators.required],
      sem_ben1: ['', Validators.required],
      sem_ben2: ['', Validators.required],
      sem_ben3: ['', Validators.required],   
      anual : ['', Validators.required],
      anu_ben1: ['', Validators.required],
      anu_ben2: ['', Validators.required],
      anu_ben3: ['', Validators.required],
    });
  }

  popularForm() {
    this.frmAliad.patchValue({
      bienvenida: this.bienvenida,
      mensual: this.preciomes,
      mes_ben1: this.mes_ben1,
      mes_ben2: this.mes_ben2,
      mes_ben3: this.mes_ben3,
      semestral: this.preciosem,
      sem_ben1: this.sem_ben1,
      sem_ben2: this.sem_ben2,
      sem_ben3: this.sem_ben3,
      anual: this.precioanual,
      anu_ben1: this.anu_ben1,
      anu_ben2: this.anu_ben2,
      anu_ben3: this.anu_ben3
    });
  }

  configPlan(){
    this.frmAliad.value.id_edit = this.id_empresa;
   
    this.frmGuardar.append('data', JSON.stringify(this.frmAliad.value));
    this.apiAliad.guardarplanes(this.frmGuardar)    
                  .subscribe((data: any)=>{
                    if(data.sucess){
                      this.bienvenida = data['bienvenida'];
                      this.preciomes =data['mes'];
                      this.mes_ben1 =data['mes_ben1'];
                      this.mes_ben2 =data['mes_ben2'];
                      this.mes_ben3 =data['mes_ben3'];
                      this.preciosem =data['semestre'];
                      this.sem_ben1 =data['sem_ben1'];
                      this.sem_ben2 =data['sem_ben2'];
                      this.sem_ben3 =data['sem_ben3'];
                      this.precioanual =data['year'];
                      this.anu_ben1 =data['anu_ben1'];
                      this.anu_ben2 =data['anu_ben2'];
                      this.anu_ben3 =data['anu_ben3'];       
                      this.mensaje = data.mensaje;
                      this.banmsj = true;
                      setTimeout(() => {
                        this.banmsj = false;
                      }, 5000);
                    }        
                  });
    
  }

}


