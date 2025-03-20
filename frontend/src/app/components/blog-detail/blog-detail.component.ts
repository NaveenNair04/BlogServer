import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog!: Blog;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe((data) => {
      this.blog = data;
    });
  }
}
