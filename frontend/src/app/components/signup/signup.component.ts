import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule]
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    if (form.valid) {
      const { name, email, password } = form.value;
      this.authService.signup(name, email, password).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed', error);
          alert('Registration failed');
        }
      );
    }
  }
}
