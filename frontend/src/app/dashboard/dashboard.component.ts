import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
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
    
    // Fetch recent blogs using the blog service
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.recentBlogs = blogs
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
      },
      error: (error) => {
        console.error('Error fetching recent blogs', error);
      }
    });
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
} 