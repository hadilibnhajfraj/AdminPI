import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8082/publications';

  constructor(private http: HttpClient) {}

  addPublication(publication: any, file: File): Observable<any> {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('publication', new Blob([JSON.stringify(publication)], { type: 'application/json' }));
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/add`, formData, { headers });
  }

  deletePublication(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers });
  }

  getMyPublications(): Observable<any[]> {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });

    return this.http.get<any[]>(`${this.apiUrl}/mine`, { headers });  // Requête GET pour récupérer les publications de l'utilisateur connecté
  }

}
