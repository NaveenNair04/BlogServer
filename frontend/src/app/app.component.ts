// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Blogging Platform';
  isLoggedIn = false;
  currentUrl = '';
  username: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Track the current route to determine if we're on auth pages
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects || event.url;
      });

    // Subscribe to auth status changes
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.username = status ? this.authService.getCurrentUsername() : null;
    });
  }

  isAuthPage(): boolean {
    return this.currentUrl.includes('/login') ||
      this.currentUrl.includes('/signup');
  }

  logout() {
    this.authService.logout();
  }
}
