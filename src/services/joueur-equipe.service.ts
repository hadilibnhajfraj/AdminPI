import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from '../../src/app/model/equipe'; 


@Injectable({
  providedIn: 'root'
})
export class JoueurEquipeService {
  private apiUrl = 'http://localhost:8082/AfficherEquipeComponent';

  constructor(private http: HttpClient) {}

  // Ajouter un joueur à une équipe
  ajouterJoueur(idEquipe: number, idJoueur: number): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.apiUrl}/${idEquipe}/addPlayer/${idJoueur}`, {});
  }

  // Retirer un joueur d'une équipe
  retirerJoueur(idEquipe: number, idJoueur: number): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.apiUrl}/${idEquipe}/removePlayer/${idJoueur}`, {});
  }
}
