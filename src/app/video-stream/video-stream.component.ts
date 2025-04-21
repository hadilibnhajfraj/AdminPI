import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';


@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css'],
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  @ViewChild("videoElement") videoElement!: ElementRef;
  @ViewChild("commentSection") commentSection!: ElementRef;

  comments: string[] = [];
  newComment = "";
  isPresse = true; // à remplacer par une vraie vérification plus tard
  isLive = false;
  message: string = '';
  localStream: MediaStream | null = null;
  peerConnection!: RTCPeerConnection;
  isBroadcaster = false;
  isViewer = false;
  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.wsService.getMessages().subscribe((msg: any) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;

      if (data.type === "comment") {
        this.addComment(data.data);
      } else if (data.type === "liveStarted") {
        alert("🔴 Nouveau live lancé !");
        this.startWebRTC();
      }
    });
  }

  ngAfterViewInit() {
    // Optionnel : démarrer automatiquement si presse
  }

  async startLiveStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.videoElement.nativeElement.srcObject = stream;

      this.wsService.startLive().subscribe({
        next: (res) => {
          this.isLive = true;
          this.wsService.sendMessage({ type: 'liveStarted' });
        },
        error: () => {
          alert("⛔ Seuls les utilisateurs avec le rôle Presse peuvent démarrer un live.");
        }
      });
    } catch (err) {
      console.error("Erreur lors du démarrage du live", err);
    }
  }

  stopLiveStream() {
    this.isLive = false;
    this.videoElement.nativeElement.srcObject.getTracks().forEach((track: any) => track.stop());
    alert("⏹️ Live arrêté.");
  }

  addComment(comment: string) {
    this.comments.push(comment);
    setTimeout(() => {
      this.commentSection.nativeElement.scrollTop = this.commentSection.nativeElement.scrollHeight;
    }, 0);
  }

  sendComment(comment: string) {
    if (comment.trim()) {
      this.wsService.sendMessage({ type: "comment", data: comment });
      this.newComment = "";
    }
  }

  startWebRTC() {
    // Signaling et WebRTC ici
  }
}
