import { Injectable } from "@angular/core";
import { WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject("ws://localhost:8082/stream");
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$;
  }
}
