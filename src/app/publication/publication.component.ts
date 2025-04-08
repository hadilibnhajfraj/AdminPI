import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../services/publication.service";

@Component({
  selector: "publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  titre: string = "";
  contenu: string = "";
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private publicationService: PublicationService) {}
  file: File | null = null;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  ngOnInit(): void {}

  addPublication() {
    const publication = { contenu: this.contenu };

    if (!this.file) {
      this.errorMessage = "Veuillez sélectionner un fichier.";
      return;
    }

    this.publicationService.addPublication(publication, this.file!).subscribe({
      next: () => {
        this.successMessage = "Publication ajoutée avec succès !";
        this.titre = "";
        this.contenu = "";
        this.file = null;
        this.errorMessage = "";
      },
      error: (err) => {
        console.error("Erreur lors de l’ajout de la publication:", err);
        if (err.status === 403) {
          this.errorMessage = "Erreur 403 : accès refusé. Vérifiez votre rôle.";
        } else if (err.status === 401) {
          this.errorMessage =
            "Erreur 401 : non autorisé. Veuillez vous reconnecter.";
        } else if (err.status === 0) {
          this.errorMessage =
            "Impossible de contacter le serveur. Vérifiez qu’il est bien démarré.";
        } else {
          this.errorMessage = "Une erreur inconnue est survenue.";
        }
      },
    });
  }
}
