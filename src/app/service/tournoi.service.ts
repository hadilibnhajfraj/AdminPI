import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournoi } from '../model/Tournoi';
import { Equipe } from '../model/Equipe';

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
  
  genererMatchs(tournoiId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/genererMatchs/${tournoiId}`, {});
  }

  getMatchsParTournoi(idTournoi: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8082/tournois/${idTournoi}/matchs`);
  }
  
  
  tournoiADejaDesMatchs(idTournoi: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${idTournoi}/hasMatchs`);
  }

  getEquipesParTournoi(tournoiId: number): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.apiUrl}/getEquipesParTournoi/${tournoiId}`);
  }
  
  affecterEquipesATournoi(tournoiId: number, equipeIds: number[]): Observable<Tournoi> {
    return this.http.put<Tournoi>(`${this.apiUrl}/affecterEquipes/${tournoiId}`, equipeIds);
  }

 
  desaffecterEquipeDuTournoi(tournoiId: number, equipeId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/desaffecterEquipe/${tournoiId}/${equipeId}`, {});
  }

  getEquipesNonInscrites(tournoiId: number): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.apiUrl}/${tournoiId}/equipesNonInscrites`);
  }
  
  mettreAJourScores(matchId: number, scoreEquipe1: number, scoreEquipe2: number): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/mettreAJourScores/${matchId}?scoreEquipe1=${scoreEquipe1}&scoreEquipe2=${scoreEquipe2}`,
      {}
    );
  }
  

  
  genererTourSuivant(tournoiId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/genererTourSuivant/${tournoiId}`, {});
  }
  
}
