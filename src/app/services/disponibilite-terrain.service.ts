import { Injectable } from '@angular/core';
import { DisponibiliteTerrain } from '../model/disponibiliteTerrain.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteTerrainService {

  private baseUrl = 'http://localhost:8082/disponibiliteTerrain'; // ou le mapping exact

  constructor(private http: HttpClient) {}

  addDisponibilite(dispo: DisponibiliteTerrain): Observable<DisponibiliteTerrain> {
    return this.http.post<DisponibiliteTerrain>(`${this.baseUrl}/addDisponibilte`, dispo);
  }

  getAllDisponibilites(): Observable<DisponibiliteTerrain[]> {
    return this.http.get<DisponibiliteTerrain[]>(`${this.baseUrl}/all`);
  }
  
  deleteDisponibilite(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDisponibilite/${id}`, { responseType: 'text' });
  }
  
  updateDisponibilite(id: number, dispo: DisponibiliteTerrain): Observable<DisponibiliteTerrain> {
    return this.http.put<DisponibiliteTerrain>(`${this.baseUrl}/updateDisponibilite/${id}`, dispo);
  }
}
