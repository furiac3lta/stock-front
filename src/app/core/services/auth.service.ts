import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/auth/login';

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.api, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}
