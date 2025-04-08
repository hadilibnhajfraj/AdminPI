import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { WebSocketService } from "../services/WebSocketService";

@Component({
  selector: "app-video-stream",
  templateUrl: "./video-stream.component.html",
  styleUrls: ["./video-stream.component.css"],
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  @ViewChild("videoElement") videoElement!: ElementRef;
  @ViewChild("remoteVideo") remoteVideo!: ElementRef; // Vidéo reçue depuis WebSocket
  @ViewChild("commentSection") commentSection!: ElementRef; // Section des commentaires
  private mediaStream!: MediaStream;

  comments: string[] = []; // Tableau pour stocker les commentaires
  newComment: string = ""; // Nouveau commentaire à envoyer

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.startStreaming();

    // Écouter les commentaires reçus en temps réel via WebSocket
    this.wsService.getMessages().subscribe((message) => {
      if (message.type === "comment") {
        this.addComment(message.data);
      }
    });
  }

  ngAfterViewInit() {
    // Après initialisation, commencez à diffuser la vidéo et gérer l'affichage des commentaires
    this.startStreaming();
  }

  // Diffusion du flux vidéo
  async startStreaming() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.videoElement.nativeElement.srcObject = this.mediaStream;

      // Vous pouvez envoyer le flux vidéo aux autres utilisateurs via WebSocket ici.
    } catch (error) {
      console.error("Erreur lors de l'accès à la caméra :", error);
      alert("Permission refusée ! Vérifiez vos paramètres de confidentialité.");
    }
  }

  // Ajouter un commentaire à l'interface
  addComment(comment: string) {
    this.comments.push(comment);
    setTimeout(() => {
      const commentSection = this.commentSection.nativeElement;
      commentSection.scrollTop = commentSection.scrollHeight; // Faire défiler la section des commentaires vers le bas
    }, 0);
  }

  // Envoyer un commentaire
  sendComment(comment: string) {
    if (comment.trim()) {
      this.wsService.sendMessage({ type: "comment", data: comment });
      this.newComment = ""; // Réinitialiser le champ de commentaire après envoi
    }
  }
}
