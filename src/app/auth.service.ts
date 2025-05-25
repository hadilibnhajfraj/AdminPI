import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  forgotPassword(email: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8082/api/auth'; // Ton backend

  constructor(private http: HttpClient) {}

  register(data: AuthRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: AuthRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  delete(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?email=${email}`);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
