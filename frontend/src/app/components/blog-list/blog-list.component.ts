import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
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
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.currentUser = this.loginService.getUsername();

    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.map((blog) => ({
        ...blog,
        createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date()
      }));
      this.filteredBlogs = this.blogs;
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBlogs = this.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(term),
    );
  }

  deleteBlog(id: number | undefined) {
    if (!id) {
      console.error('Cannot delete blog: ID is undefined');
      return;
    }
    
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          console.log(`Successfully deleted blog with ID: ${id}`);
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
