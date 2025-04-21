import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { LikeService } from '../../services/like.service';
import { CommentService } from '../../services/comment.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  currentUser: string | null = null;

  constructor(
    private blogService: BlogService,
    private likeService: LikeService,
    private commentService: CommentService,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.currentUser = this.loginService.getUsername();
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.map((blog) => ({
        ...blog,
        createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
        likesCount: blog.likesCount || 0,
        commentCount: 0
      }));
      this.filteredBlogs = this.blogs;
      this.checkLikes();
      this.loadCommentCounts();
    });
  }

  loadCommentCounts() {
    this.filteredBlogs.forEach(blog => {
      if (blog.id) {
        this.commentService.getCommentCount(blog.id).subscribe({
          next: (count) => {
            blog.commentCount = count;
          },
          error: (error) => {
            console.error('Error fetching comment count:', error);
          }
        });
      }
    });
  }

  checkLikes() {
    if (this.currentUser) {
      this.filteredBlogs.forEach(blog => {
        if (blog.id) {
          this.likeService.hasUserLiked(blog.id).subscribe({
            next: (hasLiked) => {
              blog.isLiked = hasLiked;
            },
            error: (error) => {
              console.error('Error checking like status:', error);
            }
          });
        }
      });
    }
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBlogs = this.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(term),
    );
  }

  toggleLike(blog: Blog) {
    if (!blog.id) return;
    
    this.likeService.toggleLike(blog.id).subscribe({
      next: () => {
        blog.isLiked = !blog.isLiked;
        blog.likesCount = (blog.likesCount || 0) + (blog.isLiked ? 1 : -1);
      },
      error: (error) => {
        console.error('Error toggling like:', error);
      }
    });
  }

  deleteBlog(id: number | undefined) {
    if (!id) {
      console.error('Cannot delete blog: ID is undefined');
      return;
    }
    
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          // Remove the deleted blog from the list
          this.blogs = this.blogs.filter(blog => blog.id !== id);
          this.filteredBlogs = this.filteredBlogs.filter(blog => blog.id !== id);
        },
        error: (error) => {
          console.error('Error deleting blog:', error);
          alert(error.message || 'Failed to delete blog. Please try again.');
        }
      });
    }
  }
}
