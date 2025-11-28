import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  @Output() toggleSidebar = new EventEmitter<void>();

  usuario = {
    nombre: 'Marce Dev',
    logueado: true
  };
  logout() {
  localStorage.removeItem('token'); // si usás token
  sessionStorage.clear();           // limpia sesión si hace falta
  window.location.href = '/login';  // redirige al login
}

}
