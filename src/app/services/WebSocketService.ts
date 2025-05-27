// src/app/services/web-socket.service.ts
import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://localhost:8082/ws');

    this.socket$.subscribe({
      next: (msg) => this.messagesSubject$.next(msg),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.warn('WebSocket connection closed.')
    });
  }

  sendMessage(message: any) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  getMessages(): Observable<any> {
    return this.messages$;
  }
}
