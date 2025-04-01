import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournoiService } from '../service/tournoi.service';
import { Tournoi } from '../model/Tournoi';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  tournoi: Tournoi = {} as Tournoi;
  originalTournoi: Tournoi = {} as Tournoi;
  today: string = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD

  dateDebutInvalide: boolean = false;
  dateFinInvalide: boolean = false;
  isValid: boolean = false; // Active/Désactive le bouton

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournoiService: TournoiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tournoiService.getTournoiById(id).subscribe(
        (data) => {
          this.tournoi = data;
          this.originalTournoi = { ...data };
          this.validateDates();
        },
        (error) => {
          console.error('Erreur lors de la récupération du tournoi', error);
        }
      );
    }
  }

  // Vérifie si le formulaire a été modifié
  isModified(): boolean {
    return JSON.stringify(this.tournoi) !== JSON.stringify(this.originalTournoi);
  }

  // Vérifie la validité des dates
  validateDates(): void {
    const dateDebut = new Date(this.tournoi.dateDebut);
    const dateFin = new Date(this.tournoi.dateFin);
    const today = new Date();

    this.dateDebutInvalide = dateDebut < today; // Vérifie si la date début est inférieure à aujourd’hui
    this.dateFinInvalide = dateFin < dateDebut; // Vérifie si la date fin est inférieure à la date début

    this.isValid = !this.dateDebutInvalide && !this.dateFinInvalide;
  }

  // Mise à jour du tournoi
  updateTournoi(): void {
    if (this.isModified() && this.isValid) {
      this.tournoiService.updateTournoi(this.tournoi.idTournoi, this.tournoi).subscribe(
        () => {
          alert('Tournoi mis à jour avec succès !');
          this.router.navigate(['/maps']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du tournoi', error);
        }
      );
    }
  }

  // Bouton retour
  goBack(): void {
    this.router.navigate(['/maps']);
  }
}
