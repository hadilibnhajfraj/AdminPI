import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Commentaire } from '../Interface/Commentaire';

@Component({
  selector: 'allspectateur',
  templateUrl: './allspectateur.component.html',
  styleUrls: ['./allspectateur.component.css']
})
export class AllspectateurComponent implements OnInit {
  publications: any[] = [];
  errorMessage: string = '';
  comments: { [publicationId: number]: string } = {};
  userId: any;
  reactionVisibleId: number | null = null;
  selectedReactions: { [key: number]: string } = {};
  editingCommentId: number | null = null;
  editingCommentText: string = '';

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
      this.publications = data.filter(pub => pub.status !== 'live');

      // Récupérer les commentaires pour chaque publication
      this.publications.forEach((publication) => {
        this.publicationService.getCommentaires(publication.id).subscribe({
          next: (commentaires) => {
            publication.commentaires = commentaires;
          },
          error: () => {
            this.errorMessage = "Erreur lors de la récupération des commentaires.";
          },
        });
      });
    },
    error: () => {
      this.errorMessage = "Erreur lors de la récupération des publications.";
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
    if (confirm("Êtes-vous sûr de vouloir supprimer le média de cette publication ?")) {
      this.publicationService.deletePublicationFile(id).subscribe({
        next: () => this.loadPublications(),
        error: () => this.errorMessage = "Erreur lors de la suppression du média."
      });
    }
  }

addComment(publicationId: number) {
  const commentaire = this.comments[publicationId];  // Le commentaire à ajouter
  if (!commentaire || !commentaire.trim()) {
    this.errorMessage = "Veuillez entrer un commentaire.";
    return;
  }

  // Afficher dans la console les détails du commentaire
  console.log('Commentaire envoyé:', commentaire);
  console.log('ID Publication:', publicationId);

  const payload = {
    userId: this.userId,
    data: commentaire,
    publicationId: publicationId,
  };

  // Afficher l'objet payload dans la console
  console.log('Payload envoyé à l\'API:', payload);

  // Ajouter le commentaire localement avant l'appel API
  const publication = this.publications.find(pub => pub.id === publicationId);
  if (publication) {
    if (!publication.commentaires) {
      publication.commentaires = [];
    }
    // Ajouter le commentaire au tableau local de commentaires
    publication.commentaires.push({
      id: Date.now(),  // Utilisation de l'heure actuelle comme ID temporaire
      data: commentaire,
      createdAt: new Date().toISOString(),  // Utiliser la date actuelle
      user: { id: this.userId }  // Ajouter l'utilisateur comme auteur du commentaire
    });
  }

  // Réinitialiser le champ de texte du commentaire
  this.comments[publicationId] = '';  // Réinitialiser l'input du commentaire
  this.errorMessage = '';  // Réinitialiser les erreurs

  // Appel API pour enregistrer le commentaire côté serveur
  this.publicationService.ajouterCommentaire(payload).subscribe({
    next: (newCommentaire: Commentaire) => {
      // Une fois le commentaire ajouté côté serveur, mettre à jour l'objet commenté
      const publication = this.publications.find(pub => pub.id === publicationId);
      if (publication) {
        // Remplacer le commentaire temporaire par le commentaire réel
        const commentIndex = publication.commentaires.findIndex((c) => c.id === newCommentaire.id);
        if (commentIndex !== -1) {
          publication.commentaires[commentIndex] = newCommentaire;
        }
      }
    },
    error: () => {
      this.errorMessage = "Erreur lors de l'ajout du commentaire.";
    }
  });
}





  toggleReactions(publicationId: number): void {
    this.reactionVisibleId = this.reactionVisibleId === publicationId ? null : publicationId;
  }

  selectReaction(publicationId: number, reaction: string): void {
    this.selectedReactions[publicationId] = reaction;
    this.reactionVisibleId = null;
    // this.publicationService.reactToPublication(publicationId, reaction).subscribe();
  }

  editComment(publicationId: number, commentaire: any): void {
    this.editingCommentId = commentaire.id;
    this.editingCommentText = commentaire.data;
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editingCommentText = "";
  }

  updateComment(publicationId: number, commentaireId: number): void {
    const payload = { data: this.editingCommentText };

    this.publicationService.updateCommentaire(commentaireId, payload).subscribe({
      next: () => {
        // Met à jour localement le commentaire modifié
        const publication = this.publications.find(pub => pub.id === publicationId);
        if (publication) {
          const comment = publication.commentaires.find((c: any) => c.id === commentaireId);
          if (comment) {
            comment.data = this.editingCommentText;
          }
        }
        this.cancelEdit();
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = "Erreur lors de la mise à jour du commentaire.";
      }
    });
  }

  deleteComment(publicationId: number, commentaireId: number): void {
    if (confirm("Voulez-vous supprimer ce commentaire ?")) {
      this.publicationService.supprimerCommentaire(commentaireId).subscribe({
        next: () => {
          // Supprime localement le commentaire
          const publication = this.publications.find(pub => pub.id === publicationId);
          if (publication && publication.commentaires) {
            publication.commentaires = publication.commentaires.filter((c: any) => c.id !== commentaireId);
          }
        },
        error: () => {
          this.errorMessage = "Erreur lors de la suppression du commentaire.";
        }
      });
    }
  }
}
