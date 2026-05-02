import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class Auth {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: { username: string; password: string }) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  }

  register(data: { username: string; email: string; password: string; loginTidaro: string; passwordTidaro: string }) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = this.decodePayload(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return this.decodePayload(token).sub ?? null;
    } catch {
      return null;
    }
  }

  // The claim name for role depends on the backend JwtService implementation.
  // Common options: "role", "authorities", "roles". Adjust if needed.
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const p = this.decodePayload(token);
      return p.role ?? p.authorities ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  private decodePayload(token: string): any {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
