import { Component, OnInit } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../service/tournoi.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  tournoi: Tournoi = {
    nom: '',
    nbEquipe: 0,
    frais: 0,
    dateDebut: '',
    dateFin: '',
  };

  message: string = '';
  isError: boolean = false;
  today: string = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD

  dateDebutInvalide: boolean = false;
  dateFinInvalide: boolean = false;
  isValid: boolean = false; // Active/Désactive le bouton

  constructor(private tournoiService: TournoiService) {}

  ngOnInit(): void {}

  // Vérification des dates
  validateDates(): void {
    const dateDebut = new Date(this.tournoi.dateDebut);
    const dateFin = new Date(this.tournoi.dateFin);
    const today = new Date();

    this.dateDebutInvalide = dateDebut < today; // Vérifie si la date début est inférieure à aujourd’hui
    this.dateFinInvalide = dateFin < dateDebut; // Vérifie si la date fin est inférieure à la date début

    // Active le bouton seulement si toutes les dates sont valides
    this.isValid = !this.dateDebutInvalide && !this.dateFinInvalide;
  }

  onSubmit() {
    if (
      !this.tournoi.nom ||
      this.tournoi.nbEquipe <= 0 ||
      this.tournoi.frais < 0 ||
      !this.tournoi.dateDebut ||
      !this.tournoi.dateFin ||
      !this.isValid // Vérification des dates
    ) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isError = true;
    } else {
      this.tournoiService.createTournoi(this.tournoi).subscribe(
        () => {
          this.message = 'Tournoi ajouté avec succès !';
          this.isError = false;
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la création du tournoi', error);
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
          this.isError = true;
        }
      );
    }

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  resetForm() {
    this.tournoi = { nom: '', nbEquipe: 0, frais: 0, dateDebut: '', dateFin: '' };
  }
}
