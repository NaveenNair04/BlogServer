import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  addComment(blogId: number, content: string): Observable<Comment> {
    const username = this.loginService.getUsername();
    if (!username) {
      throw new Error('User not logged in');
    }
    return this.http.post<Comment>(
      `${this.apiUrl}/${blogId}/comments?author=${username}`,
      content
    );
  }

  getComments(blogId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${blogId}/comments`);
  }

  deleteComment(commentId: number): Observable<void> {
    const username = this.loginService.getUsername();
    if (!username) {
      throw new Error('User not logged in');
    }
    return this.http.delete<void>(
      `${this.apiUrl}/comments/${commentId}?username=${username}`
    );
  }

  getCommentCount(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogId}/comments/count`);
  }
} 