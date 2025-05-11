import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { WebSocketService } from "../services/WebSocketService";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: "app-spectateur",
  templateUrl: "./spectateur.component.html",
  styleUrls: ["./spectateur.component.css"],
})
export class SpectateurComponent implements OnInit, AfterViewInit {
  @ViewChild("spectatorVideo", { static: false })
  spectatorVideo!: ElementRef<HTMLVideoElement>;

  peerConnection!: RTCPeerConnection;
  isLive = false;
  isVideoReady = false;

  comments: string[] = [];
  newComment: string = "";
  userId: any;
  publicationId: any;

  constructor(
    private wsService: WebSocketService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.isVideoReady = true;
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      console.log('User Email:', this.userId);
    }
    this.wsService.getMessages().subscribe((msg) => {
      if (msg.type === "offer") {
        this.createAnswer(msg.data);
      } else if (msg.type === "ice-candidate") {
        if (this.peerConnection) {
          this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.data));
        }
      } else if (msg.type === "comment") {
        this.comments.push(msg.data);
      } else if (msg.type === "publication-id") {
        this.publicationId = msg.data;
        console.log("Publication ID reçu:", this.publicationId);
      }
    });
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    this.peerConnection = new RTCPeerConnection();

    this.peerConnection.ontrack = (event) => {
      const stream = event.streams[0];

      const waitForVideo = () => {
        if (this.spectatorVideo && this.spectatorVideo.nativeElement) {
          this.spectatorVideo.nativeElement.srcObject = stream;
        } else {
          setTimeout(waitForVideo, 100);
        }
      };

      waitForVideo();
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.wsService.sendMessage({
          type: "ice-candidate",
          data: event.candidate,
        });
      }
    };

    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.wsService.sendMessage({ type: "answer", data: answer });
    this.isLive = true;
  }

 sendComment() {
  if (this.newComment.trim()) {
    // Envoie du commentaire avec l'ID utilisateur et ID publication
    this.wsService.sendMessage({
      type: "comment",
      data: this.newComment,
      userId: this.userId, // L'ID de l'utilisateur
      publicationId: this.publicationId, // L'ID de la publication associée
    });
    this.newComment = "";
  }
}

}
