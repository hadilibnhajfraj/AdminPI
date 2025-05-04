import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private baseUrl = 'http://localhost:8082/terrains'; // Adapté au backend Spring Boot

  constructor(private http: HttpClient) {}

  
  addTerrain(terrain: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, terrain);
  }


  getTerrains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getter`);
  }

 
  getDisponibilites(terrainId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${terrainId}/disponibilites`, {
      params: { date }
    });
  }

 
  reserverTerrain(terrainId: number, date: string, heure: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/${terrainId}/reservations`, null, {
      params: { date, heure },
      responseType: 'text' // pour récupérer un message simple comme "Réservation effectuée avec succès!"
    });
  }

  getTerrainById(terrainId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${terrainId}`);
  }
}
