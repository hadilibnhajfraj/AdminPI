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

  constructor(
    private tournoiService: TournoiService, 
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTournois();
  }

  // Charger la liste des tournois et vérifier s'ils ont des matchs
  getTournois(): void {
    this.tournoiService.getAllTournois().subscribe(
      (data) => {
        this.tournois = data;

        // Vérifier si chaque tournoi a des matchs
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

  // Afficher les détails du tournoi
  afficherDetails(tournoi: Tournoi): void {
    alert(`Détails du tournoi:\nNom: ${tournoi.nom}\nNombre d'équipes: ${tournoi.nbEquipe}\nFrais: ${tournoi.frais}\nDate de début: ${tournoi.dateDebut}\nDate de fin: ${tournoi.dateFin}`);
  }

  // Générer le planning du tournoi
  genererPlanning(tournoi: Tournoi): void {
    if (tournoi.nbEquipeRestant === 0) {
      this.tournoiService.genererMatchs(tournoi.idTournoi).subscribe(
        () => {
          this.toastr.success('Planning généré avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la génération des matchs', error);
          this.toastr.error('Une erreur est survenue lors de la génération des matchs.');
        }
      );
    } else {
      this.toastr.warning('Il reste des équipes à affecter. Impossible de générer le planning.');
    }
  }

  // Afficher les matchs du tournoi
  afficherMatchs(tournoi: Tournoi): void {
    this.router.navigate(['/matchtournoi', tournoi.idTournoi]);
  }

  // Afficher les messages de succès ou d'erreur
  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
  }
}
