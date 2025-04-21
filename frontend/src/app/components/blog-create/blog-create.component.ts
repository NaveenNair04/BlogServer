import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {
  newBlog: Partial<Blog> = {
    title: '',
    content: '',
    likesCount: 0
  };
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private blogService: BlogService,
    private loginService: LoginService,
    private router: Router
  ) {}

  createBlog() {
    this.error = null;
    this.successMessage = null;

    const username = this.loginService.getUsername();
    if (!username) {
      this.error = 'You must be logged in to create a blog';
      return;
    }

    const blogData: Blog = {
      title: this.newBlog.title || '',
      content: this.newBlog.content || '',
      author: username,
      likesCount: 0
    };

    console.log('Sending blog data:', blogData);

    this.blogService.createBlog(blogData).subscribe({
      next: (response) => {
        console.log('Blog created successfully:', response);
        this.successMessage = 'Blog created successfully!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error creating blog:', err);
        this.error = `Failed to create blog: ${err.message || 'Please try again'}`;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
