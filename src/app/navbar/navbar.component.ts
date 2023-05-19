import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  toggleUserMenu(): void {
    const userMenu = document.querySelector('.menu-sub');
    if (userMenu) {
      userMenu.classList.toggle('menu-sub-show');
    }
  }
  constructor(private authService:AuthServiceService,private router: Router,private cookieService: CookieService) {}
  logout() {
 
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }
  account() {
 
    
    this.router.navigate(['/account']);
    
  }
 
}