import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menuAberto = false;

  constructor(private router: Router) {}

  abrirMenu() {
    this.menuAberto = true;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  logout() {

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

}
