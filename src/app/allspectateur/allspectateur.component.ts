import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../services/publication.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { Commentaire } from "../Interface/Commentaire";

@Component({
  selector: "allspectateur",
  templateUrl: "./allspectateur.component.html",
  styleUrls: ["./allspectateur.component.css"],
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
          this.publicationService.getCommentaires(publication.id).subscribe({
            next: (commentaires) => {
              publication.commentaires = commentaires;
              commentaires.forEach((commentaire) => {
                this.loadReactions(commentaire.id);
              });
            },
            error: () => {
              this.errorMessage =
                "Erreur lors de la récupération des commentaires.";
            },
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

    this.publicationService
      .updateReactionCommentaires(commentaireId, emoji, email)
      .subscribe({
        next: () => {
          const pub = this.publications.find((p) => p.id === publicationId);
          const comment = pub?.commentaires.find(
            (c: any) => c.id === commentaireId
          );
          if (comment) comment.reaction = emoji;

          this.commentReactionsVisibleId = null;

          // Recharge les stats après réaction
          this.loadReactions(commentaireId);
        },
        error: () => {
          this.errorMessage = "Erreur lors de l'ajout de la réaction.";
        },
      });
  }
  getTotalReactions(commentId: number): number {
    const counts = this.reactionCounts[commentId];
    if (!counts) return 0;

    return Object.keys(counts)
      .map((key) => Number(counts[key]))
      .reduce((acc, val) => acc + val, 0);
  }
}
