import { Injectable } from '@angular/core';
import { MatchFo } from '../model/match.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private baseUrl = 'http://localhost:8082/match';

  constructor(private http: HttpClient) {}

  getAllMatchs(): Observable<MatchFo[]> {
    return this.http.get<MatchFo[]>(`${this.baseUrl}/all`);
  }

  addMatch(m: MatchFo): Observable<MatchFo> {
    return this.http.post<MatchFo>(`${this.baseUrl}/addMatch`, m);
  }

  updateMatch(id: number, m: MatchFo): Observable<MatchFo> {
    return this.http.put<MatchFo>(`${this.baseUrl}/updateMatch/${id}`, m);
  }

  deleteMatch(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteMatch/${id}`, { responseType: 'text' });
  }
}
