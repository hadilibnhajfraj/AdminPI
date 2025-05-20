import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../Interface/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8082/publications';
  private baseUrl = 'http://localhost:8082/commentaires';
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

  getMyPublicationsSpectatuer(): Observable<any[]> {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });

    return this.http.get<any[]>(`${this.apiUrl}/minepub`, { headers });  // Requête GET pour récupérer les publications de l'utilisateur connecté
  }
  // Récupérer une publication par son ID
  getPublicationById(id: string): Observable<any> {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
    return this.http.get(`${this.apiUrl}/getPublication/${id}`, { headers });
  }
  updatePublication(id: string, publication: any, file: File | null): Observable<any> {
    const formData = new FormData();

    // Ajouter la publication sous forme de JSON
    formData.append('publication', JSON.stringify(publication));

    // Ajouter le fichier si présent
    if (file) {
      formData.append('file', file, file.name);
    }

    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });

    return this.http.put(`${this.apiUrl}/updatePublication/${id}`, formData, { headers });
  }
  deletePublicationFile(id: number) {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
    return this.http.delete(`http://localhost:8082/publications/delete/${id}`, { headers });
  }
updateComment(commentId: number, commentaire: any): Observable<any> {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.put(`${this.baseUrl}/${commentId}`,  commentaire,{ headers });
}

deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.delete(`${this.baseUrl}/${commentId}`, { headers });
}
ajouterCommentaire(payload: { userId: string, data: string, publicationId: number }) {
   const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.post('http://localhost:8082/commentaires/add', payload, { headers });
}
updateCommentaire(commentId: number, payload: any) {
      const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.put(`http://localhost:8082/commentaires/${commentId}`, payload, { headers });
}

supprimerCommentaire(commentId: number) {
      const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.delete(`http://localhost:8082/commentaires/${commentId}`, { headers });
}
  addCommentaire(publicationId: number, commentaire: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${publicationId}/commentaire`, commentaire);
  }
  getCommentaires(publicationId: number) {
      const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.get<Commentaire[]>(`http://localhost:8082/publications/${publicationId}/commentaires`, { headers });
}
updateReactionCommentaire(commentaireId: number, reaction: string, email: any) {
     const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.put(`http://localhost:8082/commentaires/${commentaireId}/reaction/increment`, { reaction }, { headers });
}
getCommentReactionCount(commentId: number) {
     const token = localStorage.getItem('token');  // Récupère le token JWT stocké dans le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoute l'Authorization header avec le token
    });
  return this.http.get<{ [emoji: string]: number }>(`http://localhost:8082/commentaires/commentaires/${commentId}/reactions`, { headers });
}
}
