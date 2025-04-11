import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-pub',
  templateUrl: './user-pub.component.html',
  styleUrls: ['./user-pub.component.css']
})
export class UserPubComponent implements OnInit {
  publications: any[] = [];  // Stocke les publications de l'utilisateur
  errorMessage: string = '';  // Stocke le message d'erreur
  successMessage: string = '';  // Stocke le message de succès

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.loadPublications();  // Charge les publications lors de l'initialisation du composant
  }

  loadPublications(): void {
    this.publicationService.getMyPublications().subscribe({
      next: (data) => {
        this.publications = data;  // Récupère les publications du backend
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des publications.';  // Affiche un message d'erreur en cas de problème
      }
    });
  }
}
