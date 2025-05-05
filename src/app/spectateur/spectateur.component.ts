import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';

@Component({
  selector: 'app-spectateur',
  templateUrl: './spectateur.component.html',
  styleUrls: ['./spectateur.component.css']
})
export class SpectateurComponent implements AfterViewInit {
  @ViewChild('spectatorVideo') spectatorVideo!: ElementRef<HTMLVideoElement>;

  peerConnection!: RTCPeerConnection;
  isLive = false;
  private isVideoReady = false;

  constructor(private wsService: WebSocketService) {}

  ngAfterViewInit() {
    this.isVideoReady = true;
  }

  ngOnInit() {
    this.wsService.getMessages().subscribe((msg) => {
      if (msg.type === 'offer') {
        this.createAnswer(msg.data);
      } else if (msg.type === 'ice-candidate') {
        if (this.peerConnection) {
          this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.data));
        }
      }
    });
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    this.peerConnection = new RTCPeerConnection();

    this.peerConnection.ontrack = (event) => {
      if (this.isVideoReady) {
        this.spectatorVideo.nativeElement.srcObject = event.streams[0];
      } else {
        const interval = setInterval(() => {
          if (this.isVideoReady) {
            this.spectatorVideo.nativeElement.srcObject = event.streams[0];
            clearInterval(interval);
          }
        }, 100);
      }
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.wsService.sendMessage({ type: 'ice-candidate', data: event.candidate });
      }
    };

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.wsService.sendMessage({ type: 'answer', data: answer });
    this.isLive = true;
  }
}
