import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Import login service

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
    private loginService: LoginService, // Inject login service
  ) {}

  ngOnInit() {
    this.currentUser = this.loginService.getUsername();

    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.map((blog) => ({
        ...blog,
        createdAt: new Date(blog.createdAt),
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
}
