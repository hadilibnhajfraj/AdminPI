import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/webSocket";

@Injectable({ providedIn: "root" })
export class WebSocketService {
  private socket$: WebSocketSubject<any> = new WebSocketSubject("ws://localhost:8082/ws");
  private apiUrl = 'http://localhost:8082/publications';
  constructor(private http: HttpClient) {}

  startLive(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/start-live`, {}, { headers });
  }
  sendMessage(message: any) {
    this.socket$.next(message); // ne pas le stringifier ici !
  }


  getMessages() {
    return this.socket$;
  }
}
