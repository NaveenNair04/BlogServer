import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'; // Import the service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public loginService: LoginService, // <-- Make it public to use in template
  ) {}

  login() {
    const payload = { username: this.username, password: this.password };

    this.http
      .post('http://localhost:8080/api/auth/login', payload, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;
          this.loginService.login(); // Set login state
          this.router.navigate(['/blog-list']);
        },
        error: () => {
          this.message = 'Login failed';
          this.loginService.logout(); // Reset login state
        },
      });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
