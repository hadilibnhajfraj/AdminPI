import { Component, OnInit } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../service/tournoi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  tournois: Tournoi[] = [];
  message: string = '';    // Propriété pour le message
  isError: boolean = false; // Propriété pour savoir si c'est une erreur ou un succès

  constructor(private tournoiService: TournoiService, private router: Router) {}

  ngOnInit(): void {
    this.getTournois();
  }

  // Charger les tournois au démarrage
  getTournois(): void {
    this.tournoiService.getAllTournois().subscribe(
      (data) => {
        this.tournois = data;
        console.log('Tournois récupérés:', data); // Vérifiez si chaque tournoi a un id valide
        //this.showMessage('Tournois chargés avec succès!', false); // Message de succès
      },
      (error) => {
        console.error('Erreur lors de la récupération des tournois', error);
        this.showMessage('Une erreur est survenue lors du chargement des tournois.', true); // Message d'erreur
      }
    );
  }

  // Afficher les détails du tournoi dans une alerte
  showDetails(tournoi: Tournoi): void {
    alert(`Détails du tournoi:\nNom: ${tournoi.nom}\nNombre d'équipes: ${tournoi.nbEquipe}\nFrais: ${tournoi.frais}€`);
  }

  // Modifier un tournoi
  editTournoi(tournoi: Tournoi): void {
    this.router.navigate(['/tournoi', tournoi.idTournoi]);
  }

  // Supprimer un tournoi
  deleteTournoi(id: number): void {
    console.log('ID reçu pour suppression:', id);  // Vérifiez l'ID reçu
    if (id === undefined || id === null) {
      console.error('ID du tournoi non valide:', id);
      this.showMessage('Erreur: ID du tournoi manquant.', true); // Message d'erreur
      return;
    }

    // Afficher un message de confirmation dans le popup avant suppression
    //this.showMessage('Voulez-vous vraiment supprimer ce tournoi ?', false);

    // Après que l'utilisateur ait confirmé
    if (confirm('Voulez-vous vraiment supprimer ce tournoi ?')) {
      this.tournoiService.deleteTournoi(id).subscribe(
        () => {
         // this.showMessage('Tournoi supprimé avec succès!', false); // Message de succès
          this.getTournois(); // Recharger la liste des tournois après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du tournoi', error);
          //this.showMessage('Une erreur est survenue lors de la suppression du tournoi.', true); // Message d'erreur
        }
      );
    }
  }

  // Méthode pour afficher les messages de succès ou d'erreur
  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
  }
}
