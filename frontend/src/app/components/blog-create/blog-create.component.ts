import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  newBlog: Blog = { id: 0, title: '', content: '', author: '', createdAt: new Date() };

  constructor(private blogService: BlogService) {}

  createBlog() {
    this.blogService.createBlog(this.newBlog).subscribe(() => {
      alert('Blog created successfully!');
    });
  }
}
