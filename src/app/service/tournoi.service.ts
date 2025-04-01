import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournoi } from '../model/Tournoi';

@Injectable({
  providedIn: 'root',
})
export class TournoiService {
  private apiUrl = 'http://localhost:8082/tournois'; // Corrigé l'URL

  constructor(private http: HttpClient) {}

  getAllTournois(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(`${this.apiUrl}/getAllTournois`);
  }

  createTournoi(tournoi: Tournoi): Observable<Tournoi> {
    return this.http.post<Tournoi>(`${this.apiUrl}/createTournoi`, tournoi); // Correction ici
  }

  deleteTournoi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTournoi/${id}`);
  }

  // Récupérer un tournoi par ID
  getTournoiById(id: number): Observable<Tournoi> {
    return this.http.get<Tournoi>(`${this.apiUrl}/getTournoiById/${id}`);
  }
  updateTournoi(id: number, tournoi: Tournoi): Observable<Tournoi> {
    return this.http.put<Tournoi>(`${this.apiUrl}/updateTournoi/${id}`, tournoi);
  }
  
}
