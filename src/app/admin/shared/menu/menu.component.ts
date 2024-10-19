import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private autService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salir() {
    this.autService.logOut();
    this.router.navigate(['/home']);
  }
}
