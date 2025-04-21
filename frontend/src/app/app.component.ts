import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentRoute: string = '';

  constructor(
    public loginService: LoginService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      console.log('Current route:', this.currentRoute); // Debug log
    });
  }

  shouldShowNavbar(): boolean {
    // Show navbar on all pages except login and signup
    return !['/login', '/signup'].includes(this.currentRoute);
  }
}
