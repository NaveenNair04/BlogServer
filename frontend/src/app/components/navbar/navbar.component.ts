import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public loginService: LoginService,
    private router: Router,
  ) {}

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
