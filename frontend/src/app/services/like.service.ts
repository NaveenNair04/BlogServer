import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  toggleLike(blogId: number): Observable<void> {
    const username = this.loginService.getUsername();
    if (!username) {
      throw new Error('User not logged in');
    }
    return this.http.post<void>(`${this.apiUrl}/${blogId}/like?username=${username}`, {});
  }

  getLikeCount(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogId}/likes`);
  }

  hasUserLiked(blogId: number): Observable<boolean> {
    const username = this.loginService.getUsername();
    if (!username) {
      throw new Error('User not logged in');
    }
    return this.http.get<boolean>(`${this.apiUrl}/${blogId}/has-liked?username=${username}`);
  }
} 