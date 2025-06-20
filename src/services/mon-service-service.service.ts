
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonServiceServiceService {

  private baseUrl = 'http://localhost:8082/mon-service';

  constructor(private http: HttpClient) { }

  remplirEvenements() {
    return this.http.post(`${this.baseUrl}/remplir`, {}, { responseType: 'text' });
  }
  getTournois(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tournois`);// adapte l'URL si besoin
  }
  isTournoiSoldOut(idTournoi: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/zones-abonnement-pleines/${idTournoi}`);
  }
  getEvenementsAVenirSimplified(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listermatches`);
  }
  reserverEvenement(evenementId: number, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/evenement/${evenementId}`, data);
  }
}
