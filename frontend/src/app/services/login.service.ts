// login.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated = false;
  private username: string | null = null;

  login(username: string): void {
    this.isAuthenticated = true;
    this.username = username;
    localStorage.setItem('username', username); // Optional: persist across refreshes
  }

  logout(): void {
    this.isAuthenticated = false;
    this.username = null;
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string | null {
    return this.username || localStorage.getItem('username');
  }
}
