// src/app/video-stream/video-stream.component.ts
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import { PublicationService } from '../services/publication.service';


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
  publication: any = {};
  constructor(private wsService: WebSocketService,private publicationService: PublicationService) {}

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
    try {
      // Demander l'accès aux flux audio et vidéo
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // Afficher le flux local dans l'élément vidéo
      this.videoElement.nativeElement.srcObject = this.localStream;

      // Initialiser la connexion peer-to-peer
      this.peerConnection = new RTCPeerConnection();

      // Ajouter les pistes locales (audio/vidéo)
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // Gérer les événements ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.wsService.sendMessage({ type: 'ice-candidate', data: event.candidate });
        }
      };

      // Créer une offre et définir la description locale
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Envoyer l'offre au serveur via WebSocket
      this.wsService.sendMessage({ type: 'offer', data: offer });

      // Mise à jour de l'état du live
      this.isLive = true;

      // Créer la publication pour démarrer le live
      this.publication.isLive = true; // Cette ligne ne devrait pas poser de problème maintenant
      this.publication.contenu = 'Live en cours...';  // Vous pouvez ajuster ce contenu selon vos besoins

      console.log('isLive avant envoi à l\'API:', this.publication.isLive);

      // Exemple de fichier (vous pouvez ajuster selon votre besoin)
      const file = new File([], 'example.jpg');  // Fichier fictif, ajustez en fonction de votre logique

      // Appel au service pour ajouter la publication
      this.publicationService.addPublication(this.publication, file).subscribe(
        response => {
          console.log('Publication ajoutée:', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la publication:', error);
        }
      );

    } catch (error) {
      console.error('Erreur lors du démarrage du live:', error);
    }
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
