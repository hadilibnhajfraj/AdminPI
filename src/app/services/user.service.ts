import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  nom: string;
  email: string;
     prenom: string;
    password: string;
    dateNaissance: Date | null;
    role:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
  private baseUrl = 'http://localhost:8082/users'; // adapte l'URL selon ton backend

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  deleteUser(userId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${userId}`);
}
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/${id}`);
}

updateUser(id: number, user: User): Observable<User> {
  return this.http.put<User>(`${this.baseUrl}/${id}`, user);
}
  // ✅ Méthode d'ajout corrigée
  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`http://localhost:8082/users`, user);
  }
}
