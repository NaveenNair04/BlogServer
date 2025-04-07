import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  newBlog: Blog = {
    id: 0,
    title: '',
    content: '',
    author: '',
    createdAt: new Date()
  };

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    // Initialization code if needed
  }

  submitBlog(): void {
    this.blogService.createBlog(this.newBlog).subscribe({
      next: () => {
        // Navigate to blog list after successful creation
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating blog:', error);
      }
    });
  }
}
