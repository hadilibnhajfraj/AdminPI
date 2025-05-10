import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../service/tournoi.service';
import { ToastrService } from 'ngx-toastr';
import { Tournoi } from '../model/Tournoi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  tournois: Tournoi[] = [];
  message: string = '';
  isError: boolean = false;
  enChargement: boolean = false;
  popupVisible: boolean = false;
  popupMessage: string = '';
  rounds: any[][] = [];
  nomTournoi: string = '';
  popupBracketVisible: boolean = false;
  tournoiSelectionne!: Tournoi;

  fermerPopupBracket(): void {
    this.popupBracketVisible = false;
  }

  constructor(
    private tournoiService: TournoiService, 
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTournois();
  }

  getTournois(): void {
    this.tournoiService.getAllTournois().subscribe(
      (data) => {
        this.tournois = data;
        this.tournois.forEach(tournoi => {
          this.tournoiService.tournoiADejaDesMatchs(tournoi.idTournoi).subscribe(hasMatchs => {
            tournoi.hasMatchs = hasMatchs;
          });
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des tournois', error);
        this.showMessage('Une erreur est survenue lors du chargement des tournois.', true);
      }
    );
  }

  afficherDetails(tournoi: Tournoi): void {
    alert(`Détails du tournoi:\nNom: ${tournoi.nom}\nNombre d'équipes: ${tournoi.nbEquipe}\nFrais: ${tournoi.frais}\nDate de début: ${tournoi.dateDebut}\nDate de fin: ${tournoi.dateFin}`);
  }

  genererPlanning(tournoi: Tournoi): void {
    if (tournoi.nbEquipeRestant === 0 && !tournoi.hasMatchs) {
      this.popupVisible = true;
      this.popupMessage = "Tirage au sort en cours...";
      this.enChargement = true;

      this.tournoiService.genererMatchs(tournoi.idTournoi).subscribe(
        () => {
          setTimeout(() => {
            this.popupMessage = "Tirage au sort terminé !";
            setTimeout(() => {
              this.enChargement = false;
              this.popupVisible = false;
              // Redirection vers le composant des matchs
              this.router.navigate(['/tournoi', tournoi.idTournoi, 'matchs']);
            }, 1500);
          }, 3000); // Durée de l'animation initiale
        },
        (error) => {
          this.enChargement = false;
          this.popupVisible = false;
          console.error('Erreur lors de la génération des matchs', error);
          this.toastr.error('Une erreur est survenue lors de la génération des matchs.');
        }
      );
    } else {
      this.toastr.warning('Il reste des équipes à affecter ou les matchs existent déjà. Impossible de générer le planning.');
    }
  }

  afficherMatchs(tournoi: Tournoi): void {
    this.router.navigate(['/matchtournoi', tournoi.idTournoi]);
  }

  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
  }

  afficherBracket(tournoi: Tournoi) {
    console.log('Tournoi sélectionné ID:', tournoi.idTournoi);
    this.nomTournoi = tournoi.nom;
    this.tournoiSelectionne = tournoi;
  
    this.tournoiService.getMatchsParTournoi(tournoi.idTournoi).subscribe({
      next: (matchs) => {
        console.log('Matchs récupérés pour bracket:', matchs);
        this.rounds = [matchs]; // Temporaire si tu ne veux pas organiser par rounds
        this.popupBracketVisible = true;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des matchs du tournoi :', err);
        this.popupMessage = 'Erreur lors du chargement des matchs.';
        this.popupVisible = true;
      }
    });
  }

  genererChampionnat(tournoi: Tournoi): void {
    const confirmation = confirm("Souhaitez-vous générer un planning de championnat (format toutes rencontres) ?");
  
    if (confirmation) {
      this.popupVisible = true;
      this.popupMessage = "Génération du championnat en cours...";
      this.enChargement = true;
  
      this.tournoiService.genererChampionnat(tournoi.idTournoi, true).subscribe(
        (response) => {
          setTimeout(() => {
            this.popupMessage = "Planning championnat généré avec succès !";
            setTimeout(() => {
              this.popupVisible = false;
              this.enChargement = false;
              // Redirection vers le composant du championnat
              this.router.navigate(['/tournoi', tournoi.idTournoi, 'championnat']);
            }, 1500);
          }, 3000); // Simulation de chargement
        },
        (error) => {
          this.enChargement = false;
          this.popupVisible = false;
          console.error('Erreur génération championnat', error);
          this.toastr.error('Une erreur est survenue lors de la génération du planning de championnat.');
        }
      );
    }
  }
}
