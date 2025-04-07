// login.component.ts
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Redirect to blogs if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/blogs']);
    }
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = form.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/blogs']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message || 'Login failed. Please check your credentials.';
          console.error('Login failed', error);
        }
      });
    }
  }
}
