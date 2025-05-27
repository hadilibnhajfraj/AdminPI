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
  message: string = '';    // Propri�t� pour le message
  isError: boolean = false; // Propri�t� pour savoir si c'est une erreur ou un succ�s

  constructor(private tournoiService: TournoiService, private router: Router) {}

  ngOnInit(): void {
    this.getTournois();
  }

  // Charger les tournois au d�marrage
  getTournois(): void {
    this.tournoiService.getAllTournois().subscribe(
      (data) => {
        this.tournois = data;
        console.log('Tournois r�cup�r�s:', data); // V�rifiez si chaque tournoi a un id valide
        //this.showMessage('Tournois charg�s avec succ�s!', false); // Message de succ�s
      },
      (error) => {
        console.error('Erreur lors de la r�cup�ration des tournois', error);
        this.showMessage('Une erreur est survenue lors du chargement des tournois.', true); // Message d'erreur
      }
    );
  }

  // Afficher les d�tails du tournoi dans une alerte
  showDetails(tournoi: Tournoi): void {
    alert(`D�tails du tournoi:\nNom: ${tournoi.nom}\nNombre d'�quipes: ${tournoi.nbEquipe}\nFrais: ${tournoi.frais}�`);
  }

  // Modifier un tournoi
  editTournoi(tournoi: Tournoi): void {
    this.router.navigate(['/tournoi', tournoi.idTournoi]);
  }

  // Supprimer un tournoi
  deleteTournoi(id: number): void {
    console.log('ID re�u pour suppression:', id);  // V�rifiez l'ID re�u
    if (id === undefined || id === null) {
      console.error('ID du tournoi non valide:', id);
      this.showMessage('Erreur: ID du tournoi manquant.', true); // Message d'erreur
      return;
    }

    // Afficher un message de confirmation dans le popup avant suppression
    //this.showMessage('Voulez-vous vraiment supprimer ce tournoi ?', false);

    // Apr�s que l'utilisateur ait confirm�
    if (confirm('Voulez-vous vraiment supprimer ce tournoi ?')) {
      this.tournoiService.deleteTournoi(id).subscribe(
        () => {
         // this.showMessage('Tournoi supprim� avec succ�s!', false); // Message de succ�s
          this.getTournois(); // Recharger la liste des tournois apr�s suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du tournoi', error);
          //this.showMessage('Une erreur est survenue lors de la suppression du tournoi.', true); // Message d'erreur
        }
      );
    }
  }

  // M�thode pour afficher les messages de succ�s ou d'erreur
  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
  }
}
