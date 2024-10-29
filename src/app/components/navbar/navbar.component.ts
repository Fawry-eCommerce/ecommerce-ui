import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    authService.userData.subscribe({
      next: () => {
        this.isLogin = authService.userData.getValue() !== null;
        this.isAdmin = authService.isAdmin();
        if (this.isLogin) this.email = authService.getUserEmail();
      }
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
