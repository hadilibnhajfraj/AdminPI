import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipe } from '../../src/app/model/equipe';
import { Joueur } from '../../src/app/model/joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurEquipeService {
  private apiUrl = 'http://localhost:8082/joueurs';
  private Urlequipe = 'http://localhost:8082/equipes';



  constructor(private http: HttpClient) {}

// ******************************Equipe************************************************
  // Récupérer toutes les équipes
  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.Urlequipe}/all`);
  }

  

  // Ajouter un joueur à une équipe
  ajouterJoueur(idEquipe: number, idJoueur: number): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.Urlequipe}/${idEquipe}/addPlayer/${idJoueur}`, {});
  }

  // Retirer un joueur d'une équipe
  retirerJoueur(idEquipe: number, idJoueur: number): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.Urlequipe}/${idEquipe}/removePlayer/${idJoueur}`, {});
  }

  // Ajouter une nouvelle équipe
 /* ajouterEquipe(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.Urlequipe}/add`, formData);
  }*/
    ajouterEquipeAvecLogo(equipe: any, logo: File): Observable<any> {
      const formData = new FormData();
      formData.append('equipe', new Blob([JSON.stringify(equipe)], { type: 'application/json' }));
      formData.append('logo', logo);
      return this.http.post(`${this.Urlequipe}/add`, formData);
    }
    

  // Récupérer une équipe par ID
  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.Urlequipe}/afficher/${id}`);
  }

  // Modifier une équipe
  modifierEquipe(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.Urlequipe}/${id}`, formData);
  }

  // Supprimer une équipe
  supprimerEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Urlequipe}/supprimer/${id}`);
  }
  private equipeDeletedSource = new BehaviorSubject<boolean>(false);
  equipeDeleted$ = this.equipeDeletedSource.asObservable();

  notifyEquipeDeleted() {
    this.equipeDeletedSource.next(true);
  }

  resetNotification() {
    this.equipeDeletedSource.next(false);
  }
 // ****************************** Joueur************************************************

 // Ajouter un joueur
  ajouterNouveauJoueur(joueurData: any): Observable<Joueur> {
  return this.http.post<Joueur>(`${this.apiUrl}/add`, joueurData);
}

 

// Récupérer tous les joueurs
getAllJoueurs(): Observable<Joueur[]> {
  return this.http.get<Joueur[]>(`${this.apiUrl}/all`);
}

// Supprimer un joueur
supprimerJoueur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/deleteJoueur/${id}`);
}

// Obtenir un joueur par ID
getJoueurById(id: number): Observable<Joueur> {
  return this.http.get<Joueur>(`${this.apiUrl}/${id}`);
}


modifierJoueur(id: number, joueur: Joueur) {
  return this.http.put(`http://localhost:8082/joueurs/update/${id}`, joueur);
}


}
