import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../services/publication.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { Commentaire } from "../Interface/Commentaire";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: "allspectateur",
  templateUrl: "./allspectateur.component.html",
  styleUrls: ["./allspectateur.component.css"],
    animations: [
    trigger('reactionChange', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ]),
  ],
})
export class AllspectateurComponent implements OnInit {
  publications: any[] = [];
  errorMessage: string = "";
  comments: { [publicationId: number]: string } = {};
  userId: any;
  reactionVisibleId: number | null = null;
  selectedReactions: { [key: number]: string } = {};
  editingCommentId: number | null = null;
  editingCommentText: string = "";
  commentReactionsVisibleId: number | null = null;
  reactionCounts: { [commentId: number]: { [emoji: string]: number } } = {};
userReactions: { [commentId: number]: string } = {};
publicationReactions: { [publicationId: number]: { [emoji: string]: number } } = {};
userPublicationReactions: { [publicationId: number]: string } = {};
shareVisibleId: number | null = null;
  constructor(
    private publicationService: PublicationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
    }
    this.loadPublications();
  }
loadPublications(): void {
  this.publicationService.getMyPublicationsSpectatuer().subscribe({
    next: (data) => {
      this.publications = data.filter((pub) => pub.status !== "live");

      this.publications.forEach((publication) => {
        // ✅ Charger les commentaires
        this.publicationService.getCommentaires(publication.id).subscribe({
          next: (commentaires) => {
            publication.commentaires = commentaires;

            commentaires.forEach((commentaire) => {
              this.loadReactions(commentaire.id);

              this.publicationService.getUserReaction(commentaire.id, this.userId).subscribe({
                next: (reaction) => {
                  if (reaction?.type) {
                    this.userReactions[commentaire.id] = reaction.type;
                  }
                },
                error: () => {
                  console.error("Erreur en récupérant la réaction utilisateur", commentaire.id);
                }
              });
            });
          },
          error: () => {
            this.errorMessage = "Erreur lors de la récupération des commentaires.";
          },
        });

        // ✅ Charger les réactions de la publication
        this.publicationService.getPublicationReactionCount(publication.id).subscribe({
          next: (counts) => {
                console.log('🔄 Réactions publication', publication.id, counts);
            this.publicationReactions[publication.id] = counts;
          },
          error: () => {
            console.error("Erreur en récupérant les réactions de la publication", publication.id);
          }
        });

        // ✅ Charger la réaction de l’utilisateur sur la publication
        this.publicationService.getUserPublicationReaction(publication.id, this.userId).subscribe({
          next: (reaction) => {
            if (reaction?.type) {
              this.userPublicationReactions[publication.id] = reaction.type;
            }
          },
          error: () => {
            console.error("Erreur en récupérant la réaction utilisateur pour publication", publication.id);
          }
        });

      });
    },
    error: () => {
      this.errorMessage = "Erreur lors de la récupération des publications.";
    },
  });
}

  loadReactions(commentId: number) {
    this.publicationService.getCommentReactionCount(commentId).subscribe({
      next: (counts) => {
        console.log(`Réactions pour le commentaire ${commentId}`, counts);
        this.reactionCounts[commentId] = counts;
      },
      error: () => {
        console.error(
          "Erreur lors de la récupération des réactions du commentaire",
          commentId
        );
      },
    });
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  onAdd() {
    this.router.navigate(["/publication"]);
  }

  onEdit(publication: any) {
    this.router.navigate(["/updatePub", publication.id]);
  }

  onDelete(publication: any): void {
    const id = publication.id;
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer le média de cette publication ?"
      )
    ) {
      this.publicationService.deletePublicationFile(id).subscribe({
        next: () => this.loadPublications(),
        error: () =>
          (this.errorMessage = "Erreur lors de la suppression du média."),
      });
    }
  }

  addComment(publicationId: number) {
    const commentaire = this.comments[publicationId];
    if (!commentaire || !commentaire.trim()) {
      this.errorMessage = "Veuillez entrer un commentaire.";
      return;
    }

    const payload = {
      userId: this.userId,
      data: commentaire,
      publicationId: publicationId,
    };

    this.comments[publicationId] = "";
    this.errorMessage = "";

    this.publicationService.ajouterCommentaire(payload).subscribe({
      next: () => {
        this.loadPublications(); // ✅ recharge tout après ajout
      },
      error: () => {
        this.errorMessage = "Erreur lors de l'ajout du commentaire.";
      },
    });
  }

  toggleReactions(publicationId: number): void {
    this.reactionVisibleId =
      this.reactionVisibleId === publicationId ? null : publicationId;
  }

  selectReaction(publicationId: number, reaction: string): void {
    this.selectedReactions[publicationId] = reaction;
    this.reactionVisibleId = null;
    // API call to react could be placed here
  }

  editComment(publicationId: number, commentaire: any) {
    this.editingCommentId = commentaire.id;
    this.editingCommentText = commentaire.texte;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editingCommentText = "";
  }

  updateComment(publicationId: number, commentId: number) {
    const payload = { texte: this.editingCommentText };

    this.publicationService.updateCommentaire(commentId, payload).subscribe({
      next: () => {
        const publication = this.publications.find(
          (pub) => pub.id === publicationId
        );
        if (publication && publication.commentaires) {
          const comment = publication.commentaires.find(
            (c: any) => c.id === commentId
          );
          if (comment) {
            comment.texte = this.editingCommentText; // mise à jour locale du texte
          }
        }

        this.editingCommentId = null;
        this.editingCommentText = "";
      },
      error: () => {
        this.errorMessage = "Erreur lors de la mise à jour du commentaire.";
      },
    });
  }

  deleteComment(publicationId: number, commentaireId: number): void {
    if (confirm("Voulez-vous supprimer ce commentaire ?")) {
      this.publicationService.supprimerCommentaire(commentaireId).subscribe({
        next: () => {
          const publication = this.publications.find(
            (pub) => pub.id === publicationId
          );
          if (publication && publication.commentaires) {
            publication.commentaires = publication.commentaires.filter(
              (c: any) => c.id !== commentaireId
            );
          }
        },
        error: () => {
          this.errorMessage = "Erreur lors de la suppression du commentaire.";
        },
      });
    }
  }
  toggleCommentReactions(commentId: number): void {
    this.commentReactionsVisibleId =
      this.commentReactionsVisibleId === commentId ? null : commentId;
  }
  getReactionKeys(commentId: number): string[] {
    return this.reactionCounts[commentId]
      ? Object.keys(this.reactionCounts[commentId])
      : [];
  }

selectCommentReaction(
  publicationId: number,
  commentaireId: number,
  emoji: string
): void {
  const token = this.authService.getToken();
  const decoded: any = jwtDecode(token);
  const email = decoded.sub;

  const currentReaction = this.userReactions[commentaireId];

  // Si l’utilisateur reclique sur la même réaction => suppression
  if (currentReaction === emoji) {
    this.publicationService
      .updateReactionCommentaires(commentaireId, "", email)
      .subscribe(() => {
        delete this.userReactions[commentaireId];

        if (this.reactionCounts[commentaireId]?.[emoji]) {
          this.reactionCounts[commentaireId][emoji]--;
          if (this.reactionCounts[commentaireId][emoji] === 0) {
            delete this.reactionCounts[commentaireId][emoji];
          }
        }

        this.commentReactionsVisibleId = null;
      });
  } else {
    // Nouvelle réaction OU changement de réaction
    this.publicationService
      .updateReactionCommentaires(commentaireId, emoji, email)
      .subscribe(() => {
        this.reactionCounts[commentaireId] ||= {};

        // Décrémenter l’ancienne réaction si elle existe
        if (currentReaction && this.reactionCounts[commentaireId][currentReaction]) {
          this.reactionCounts[commentaireId][currentReaction]--;
          if (this.reactionCounts[commentaireId][currentReaction] === 0) {
            delete this.reactionCounts[commentaireId][currentReaction];
          }
        }

        // Incrémenter la nouvelle
        if (!this.reactionCounts[commentaireId][emoji]) {
          this.reactionCounts[commentaireId][emoji] = 1;
        } else {
          this.reactionCounts[commentaireId][emoji]++;
        }

        // Mettre à jour l'affichage local de la réaction de l'utilisateur
        this.userReactions[commentaireId] = emoji;
        this.commentReactionsVisibleId = null;
      });
  }
}
selectPublicationReaction(publicationId: number, emoji: string): void {
  const token = this.authService.getToken();
  const decoded: any = jwtDecode(token);
  const email = decoded.sub;

  const currentReaction = this.userPublicationReactions[publicationId];

  if (currentReaction === emoji) {
    this.publicationService.updateReactionPublication(publicationId, "", email).subscribe(() => {
      delete this.userPublicationReactions[publicationId];
      if (this.publicationReactions[publicationId]?.[emoji]) {
        this.publicationReactions[publicationId][emoji]--;
        if (this.publicationReactions[publicationId][emoji] === 0) {
          delete this.publicationReactions[publicationId][emoji];
        }
      }
      this.reactionVisibleId = null;
    });
  } else {
    this.publicationService.updateReactionPublication(publicationId, emoji, email).subscribe(() => {
      this.publicationReactions[publicationId] ||= {};

      if (currentReaction && this.publicationReactions[publicationId][currentReaction]) {
        this.publicationReactions[publicationId][currentReaction]--;
        if (this.publicationReactions[publicationId][currentReaction] === 0) {
          delete this.publicationReactions[publicationId][currentReaction];
        }
      }

      if (!this.publicationReactions[publicationId][emoji]) {
        this.publicationReactions[publicationId][emoji] = 1;
      } else {
        this.publicationReactions[publicationId][emoji]++;
      }

      this.userPublicationReactions[publicationId] = emoji;
      this.reactionVisibleId = null;
    });
  }
}
getPublicationReactionKeys(publicationId: number): string[] {
  return this.publicationReactions[publicationId]
    ? Object.keys(this.publicationReactions[publicationId])
    : [];
}

getTotalPublicationReactions(publicationId: number): number {
  const counts = this.publicationReactions[publicationId];
  if (!counts) return 0;

  return Object.keys(counts).map(key => counts[key]).reduce((acc, val) => acc + val, 0);

}



  getTotalReactions(commentId: number): number {
    const counts = this.reactionCounts[commentId];
    if (!counts) return 0;

    return Object.keys(counts)
      .map((key) => Number(counts[key]))
      .reduce((acc, val) => acc + val, 0);
  }
  toggleShare(publicationId: number): void {
  this.shareVisibleId = this.shareVisibleId === publicationId ? null : publicationId;
}

getPublicationUrl(publicationId: number): string {
  return `http://localhost:4200/publication/${publicationId}`; // remplace avec ton vrai lien
}

copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).then(() => {
    alert("Lien copié !");
  }).catch(() => {
    alert("Erreur lors de la copie.");
  });
}
}
