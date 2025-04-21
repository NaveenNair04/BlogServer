import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    const payload = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.http
      .post('http://localhost:8080/api/auth/signup', payload, {
        responseType: 'text'
      })
      .subscribe({
        next: (response) => {
          this.message = response;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.message = error.error || 'Registration failed';
        }
      });
  }
} 