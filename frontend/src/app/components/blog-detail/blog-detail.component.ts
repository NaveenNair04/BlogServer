// blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { LikeService } from '../../services/like.service';
import { LoginService } from '../../services/login.service';
import { Blog } from '../../models/blog.model';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  template: `
    <div class="blog-container" *ngIf="blog; else errorTemplate">
      <h1 class="title">{{ blog.title }}</h1>
      <p class="meta">
        by {{ blog.author }} on {{ blog.createdAt | date: "medium" }}
      </p>
      <div class="content">{{ blog.content }}</div>
      
      <!-- Like Button -->
      <div class="actions">
        <button
          class="like-btn"
          [class.liked]="blog.isLiked"
          (click)="toggleLike()"
          [disabled]="!isLoggedIn"
        >
          <span class="like-icon">❤️</span>
          <span class="like-count">{{ blog.likesCount || 0 }}</span>
        </button>
      </div>

      <!-- Comments Section -->
      <app-comment-section [blogId]="blog.id!"></app-comment-section>
      
      <button class="back-btn" (click)="goBack()">← Back to Blogs</button>
    </div>

    <ng-template #errorTemplate>
      <div class="error-message">
        <p>{{ error }}</p>
        <button (click)="goBack()">← Back to Blogs</button>
      </div>
    </ng-template>
  `,
  styles: [`
    .blog-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .title {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .meta {
      color: #666;
      margin-bottom: 2rem;
    }

    .content {
      line-height: 1.6;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .actions {
      margin-bottom: 2rem;
    }

    .like-btn {
      background-color: transparent;
      border: 1px solid #dc3545;
      color: #dc3545;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.3s ease;
    }

    .like-btn:hover:not([disabled]) {
      background-color: rgba(220, 53, 69, 0.1);
    }

    .like-btn.liked {
      background-color: #dc3545;
      color: white;
    }

    .like-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .back-btn {
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .error-message {
      text-align: center;
      color: #dc3545;
      margin: 2rem;
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  error: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private likeService: LikeService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlog(+id);
    } else {
      this.error = 'Blog not found';
    }
  }

  loadBlog(id: number) {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        if (this.isLoggedIn) {
          this.checkLikeStatus();
        }
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.error = 'Failed to load blog';
      }
    });
  }

  checkLikeStatus() {
    if (this.blog?.id) {
      this.likeService.hasUserLiked(this.blog.id).subscribe({
        next: (hasLiked) => {
          if (this.blog) {
            this.blog.isLiked = hasLiked;
          }
        },
        error: (error) => {
          console.error('Error checking like status:', error);
        }
      });
    }
  }

  toggleLike() {
    if (!this.blog?.id) return;
    
    this.likeService.toggleLike(this.blog.id).subscribe({
      next: () => {
        if (this.blog) {
          this.blog.isLiked = !this.blog.isLiked;
          this.blog.likesCount = (this.blog.likesCount || 0) + (this.blog.isLiked ? 1 : -1);
        }
      },
      error: (error) => {
        console.error('Error toggling like:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/blog-list']);
  }
}
