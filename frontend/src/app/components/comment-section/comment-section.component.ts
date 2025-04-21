import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { LoginService } from '../../services/login.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comments-section">
      <h3>Comments ({{ comments.length }})</h3>
      
      <!-- Add Comment Form -->
      <div class="comment-form" *ngIf="isLoggedIn">
        <textarea
          [(ngModel)]="newCommentContent"
          placeholder="Write a comment..."
          rows="3"
          class="comment-input"
        ></textarea>
        <button
          (click)="addComment()"
          [disabled]="!newCommentContent.trim()"
          class="submit-btn"
        >
          Post Comment
        </button>
      </div>
      <div *ngIf="!isLoggedIn" class="login-prompt">
        Please log in to comment.
      </div>

      <!-- Comments List -->
      <div class="comments-list">
        <div *ngFor="let comment of comments" class="comment">
          <div class="comment-header">
            <strong>{{ comment.author }}</strong>
            <span class="comment-date">{{ comment.createdAt | date:'medium' }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
          <button
            *ngIf="currentUser === comment.author"
            (click)="deleteComment(comment.id!)"
            class="delete-btn"
          >
            Delete
          </button>
        </div>
        <p *ngIf="comments.length === 0" class="no-comments">
          No comments yet. Be the first to comment!
        </p>
      </div>
    </div>
  `,
  styles: [`
    .comments-section {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .comment-form {
      margin-bottom: 2rem;
    }

    .comment-input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
    }

    .submit-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .submit-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .login-prompt {
      margin: 1rem 0;
      color: #666;
      font-style: italic;
    }

    .comments-list {
      margin-top: 1rem;
    }

    .comment {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .comment-date {
      font-size: 0.9em;
    }

    .comment-content {
      margin: 0;
      line-height: 1.4;
    }

    .delete-btn {
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9em;
    }

    .delete-btn:hover {
      background-color: #c82333;
    }

    .no-comments {
      color: #666;
      font-style: italic;
    }
  `]
})
export class CommentSectionComponent implements OnInit {
  @Input() blogId!: number;
  comments: Comment[] = [];
  newCommentContent: string = '';
  isLoggedIn: boolean = false;
  currentUser: string | null = null;

  constructor(
    private commentService: CommentService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.currentUser = this.loginService.getUsername();
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.blogId).subscribe({
      next: (comments) => {
        this.comments = comments.map(comment => ({
          ...comment,
          createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
        }));
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }

  addComment() {
    if (!this.newCommentContent.trim()) return;

    this.commentService.addComment(this.blogId, this.newCommentContent).subscribe({
      next: (comment) => {
        this.comments.unshift({
          ...comment,
          createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
        });
        this.newCommentContent = '';
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again.');
      }
    });
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
          alert('Failed to delete comment. Please try again.');
        }
      });
    }
  }
} 