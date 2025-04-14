import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  newBlog: Partial<Blog> = { title: '', content: '' };
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private loginService: LoginService,
  ) {}

  createBlog() {
    this.error = null;
    this.successMessage = null;

    const username = this.loginService.getUsername();
    if (!username) {
      this.error = 'You must be logged in to create a blog.';
      return;
    }

    const blogWithAuthor: Blog = {
      ...(this.newBlog as Blog),
      author: username,
    };

    this.blogService.createBlog(blogWithAuthor).subscribe({
      next: () => {
        this.successMessage = 'Blog created successfully!';
        this.resetForm();

        setTimeout(() => {
          this.router.navigate(['/blog-list']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error creating blog:', err);
        this.error = 'Failed to create blog. Please try again.';
      },
    });
  }

  private resetForm() {
    this.newBlog = { title: '', content: '' };
  }

  goBack() {
    this.router.navigate(['/blog-list']);
  }
}
