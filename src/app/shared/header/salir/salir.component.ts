import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrl: './salir.component.css'
}) 
export class SalirComponent {

  constructor(
    public apiAuth: AuthService,
    private router: Router) {
    
  }

  getOut() {
    this.apiAuth.logOut();
    this.router.navigateByUrl('/home');
  }

}
