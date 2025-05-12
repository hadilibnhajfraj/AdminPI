import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../services/publication.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "user-pub",
  templateUrl: "./user-pub.component.html",
  styleUrls: ["./user-pub.component.css"],
})
export class UserPubComponent implements OnInit {
  publications: any[] = []; // Stocke les publications de l'utilisateur
  errorMessage: string = ""; // Stocke le message d'erreur
  successMessage: string = ""; // Stocke le message de succès
  page = 1; // Page actuelle
  pageSize = 5; // Nombre d'éléments par page

  get paginatedPublications() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.publications.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    this.page = page;
  }
  constructor(
    private publicationService: PublicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPublications(); // Charge les publications lors de l'initialisation du composant
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
  fetchPublications(): void {
    this.publicationService.getMyPublications().subscribe({
      next: (data) => {
        this.publications = data;
        // this.paginatedPublications(); // Si tu as une méthode de pagination
      },
      error: (error) => {
        console.error("Erreur lors du chargement des publications :", error);
        this.errorMessage = "Erreur lors du chargement des publications.";
      },
    });
  }

  onDelete(publication: any): void {
    const id = publication.id;
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer le média de cette publication ?"
      )
    ) {
      this.publicationService.deletePublicationFile(id).subscribe({
        next: () => {
          this.successMessage = "Média supprimé avec succès.";
          this.fetchPublications(); // Recharge les données
        },
        error: (error) => {
          console.error("Erreur lors de la suppression du média :", error);
          this.errorMessage = "Erreur lors de la suppression du média.";
        },
      });
    }
  }

  loadPublications(): void {
    this.publicationService.getMyPublications().subscribe({
      next: (data) => {
        this.publications = data; // Récupère les publications du backend
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la récupération des publications."; // Affiche un message d'erreur en cas de problème
      },
    });
  }
  onAddLive(){
    this.router.navigate(["/video"]);
  }
}
