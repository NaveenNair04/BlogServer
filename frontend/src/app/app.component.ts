import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router) {}

  ngOnInit() {
    // Track the current route to determine if we're on auth pages
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects || event.url;
      });

    // You would typically check for a token in localStorage or a auth service
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  isAuthPage(): boolean {
    return this.currentUrl.includes('/login') ||
      this.currentUrl.includes('/signup');
  }

  logout() {
    // Clear any auth tokens
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
