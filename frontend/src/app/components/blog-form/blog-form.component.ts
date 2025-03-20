import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {
  newBlog: Blog = { id: 0, title: '', content: '', author: '', createdAt: new Date() };

  constructor(private blogService: BlogService) {}

  submitBlog() {
    this.blogService.addBlog(this.newBlog).subscribe({
      next: (blog) => {
        console.log('Blog added:', blog);
        this.newBlog = { id: 0, title: '', content: '', author: '', createdAt: new Date() };
      },
      error: (err) => console.error('Error adding blog:', err)
    });
  }
}
