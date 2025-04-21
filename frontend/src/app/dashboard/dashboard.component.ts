import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  recentBlogs: Blog[] = [];
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.username = this.loginService.getUsername();
    
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.username) {
      this.blogService.getUserBlogs(this.username).subscribe({
        next: (blogs) => {
          this.recentBlogs = blogs.slice(0, 3); // Show only the 3 most recent blogs
        },
        error: (error) => {
          console.error('Error fetching user blogs:', error);
        }
      });
    }
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
} 