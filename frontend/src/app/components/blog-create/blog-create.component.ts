// blog-create.component.ts
import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  newBlog: Partial<Blog> = { title: '', content: '', author: '' };
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

  createBlog() {
    this.error = null;
    this.successMessage = null;

    this.blogService.createBlog(this.newBlog as Blog).subscribe({
      next: () => {
        this.successMessage = 'Blog created successfully!';
        this.resetForm();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500); // Delay before navigating
      },
      error: (err) => {
        console.error('Error creating blog:', err);
        this.error = 'Failed to create blog. Please try again.';
      },
    });
  }

  private resetForm() {
    this.newBlog = { title: '', content: '', author: '' };
  }
}
