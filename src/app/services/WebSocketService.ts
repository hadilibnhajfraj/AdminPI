import { Injectable } from "@angular/core";
import { WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject("ws://localhost:8082/ws"); // URL de connexion WebSocket
  }

  sendMessage(message: Blob | object) {
    if (message instanceof Blob) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(message);
      reader.onloadend = () => {
        this.socket$.next(reader.result as ArrayBuffer);
      };
    } else {
      this.socket$.next(JSON.stringify(message));
    }
  }

  getMessages() {
    return this.socket$;
  }
}
