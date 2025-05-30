import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);  // Changez 'jwt' en 'token'
  }

  getToken(): string | null {
    return localStorage.getItem('token');  // Changez 'jwt' en 'token'
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
