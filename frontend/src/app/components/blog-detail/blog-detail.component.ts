// blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(+id).subscribe({
        next: (data) => (this.blog = data),
        error: (err) => {
          console.error('Error fetching blog:', err);
          this.error = 'Failed to load blog.';
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/blog-list']);
  }
}
