import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed');
        }
      );
    }
  }
}
