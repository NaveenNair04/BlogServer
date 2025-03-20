import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }
}
