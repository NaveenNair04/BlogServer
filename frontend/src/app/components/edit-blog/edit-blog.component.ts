import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  blogId!: number;
  blog: Blog | null = null;
  error: string | null = null;
  successMessage: string | null = null;
  isAuthor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (data) => {
        this.blog = data;
        this.isAuthor = this.loginService.getUsername() === data.author;
        if (!this.isAuthor) {
          this.error = 'You are not authorized to edit this blog.';
        }
      },
      error: () => {
        this.error = 'Failed to load blog.';
      },
    });
  }

  updateBlog(): void {
    if (this.blog) {
      this.blogService.updateBlog(this.blog.id, this.blog).subscribe({
        next: () => {
          this.successMessage = 'Blog updated successfully!';
          setTimeout(() => this.router.navigate(['/blog-list']), 1500);
        },
        error: () => {
          this.error = 'Failed to update blog.';
        },
      });
    }
  }
}
