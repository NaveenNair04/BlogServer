import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) {}

  // Get all blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single blog by ID
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new blog
  createBlog(blog: Blog): Observable<Blog> {
    console.log('Sending blog data:', blog); // Debug log

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.post<Blog>(this.apiUrl, blog, { headers }).pipe(
      tap(response => console.log('Server response:', response)), // Debug log
      catchError(this.handleError)
    );
  }

  // Update an existing blog
  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  getUserBlogs(username: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/user/${username}`);
  }

  // Delete a blog
  deleteBlog(id: number | undefined): Observable<void> {
    if (!id) {
      return throwError(() => new Error('Cannot delete blog: ID is undefined'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Successfully sent delete request for blog ID: ${id}`)),
      catchError(error => {
        console.error('Delete blog error:', error);
        if (error.status === 404) {
          return throwError(() => new Error('Blog not found'));
        } else if (error.status === 403) {
          return throwError(() => new Error('You do not have permission to delete this blog'));
        } else {
          return throwError(() => new Error('Failed to delete blog. Please try again later.'));
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
