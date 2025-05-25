import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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
  register(user: {
    nom: string;
    prenom: string;
    dateNaissance: string;
    role: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, httpOptions);
  }
  forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, { email });
}
resetPassword(data: { email: string, tempPassword: string, newPassword: string }) {
  return this.http.post(`${this.apiUrl}/reset-password`, data);
}

}