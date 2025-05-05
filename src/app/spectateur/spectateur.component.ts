// src/app/spectateur/spectateur.component.ts
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';


@Component({
  selector: 'app-spectateur',
  templateUrl: './spectateur.component.html',
  styleUrls: ['./spectateur.component.css']
})
export class SpectateurComponent implements OnInit, AfterViewInit {
  @ViewChild('spectatorVideo') spectatorVideo!: ElementRef<HTMLVideoElement>;

  peerConnection!: RTCPeerConnection;
  isLive = false;
  isVideoReady = false;

  comments: string[] = [];
  newComment: string = '';

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
      } else if (msg.type === 'comment') {
        this.comments.push(msg.data);
      }
    });
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    this.peerConnection = new RTCPeerConnection();

    this.peerConnection.ontrack = (event) => {
      const stream = event.streams[0];
      if (this.isVideoReady) {
        this.spectatorVideo.nativeElement.srcObject = stream;
      } else {
        const interval = setInterval(() => {
          if (this.isVideoReady) {
            this.spectatorVideo.nativeElement.srcObject = stream;
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

  sendComment() {
    if (this.newComment.trim()) {
      this.wsService.sendMessage({ type: 'comment', data: this.newComment });
      this.newComment = '';
    }
  }
}
