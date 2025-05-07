// src/app/video-stream/video-stream.component.ts
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';


@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  peerConnection!: RTCPeerConnection;
  localStream!: MediaStream;
  isLive = false;
  comments: string[] = [];
  pendingCandidates: RTCIceCandidate[] = [];
  constructor(private wsService: WebSocketService) {}

  async ngOnInit() {
    this.wsService.getMessages().subscribe(async (msg) => {
      if (msg.type === 'answer') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg.data));

        // Ajout des candidats en attente après avoir défini la remoteDescription
        this.pendingCandidates.forEach(candidate => {
          this.peerConnection.addIceCandidate(candidate);
        });
        this.pendingCandidates = [];
      } else if (msg.type === 'ice-candidate') {
        const candidate = new RTCIceCandidate(msg.data);

        // Si remoteDescription est déjà définie
        if (this.peerConnection?.remoteDescription) {
          await this.peerConnection.addIceCandidate(candidate);
        } else {
          // Sinon, on stocke temporairement le candidat
          this.pendingCandidates.push(candidate);
        }
      } else if (msg.type === 'comment') {
        this.comments.push(msg.data);
      }
    });
  }

  async startLiveStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.videoElement.nativeElement.srcObject = this.localStream;

    this.peerConnection = new RTCPeerConnection();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.wsService.sendMessage({ type: 'ice-candidate', data: event.candidate });
      }
    };

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    this.wsService.sendMessage({ type: 'offer', data: offer });

    this.isLive = true;
  }

  stopLiveStream() {
    this.isLive = false;
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }
}
