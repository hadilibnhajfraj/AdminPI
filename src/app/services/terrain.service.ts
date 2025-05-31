import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../model/terrain.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  
  private baseUrl = 'http://localhost:8082/terrain';

  constructor(private http: HttpClient) {}

  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.baseUrl}/all`);
  }

  addTerrain(t: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.baseUrl}/addTerrain`, t);
  }

  updateTerrain(id: number, t: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.baseUrl}/update/${id}`, t);
  }

  deleteTerrain(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
