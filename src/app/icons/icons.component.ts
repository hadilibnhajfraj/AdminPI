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

  constructor(private tournoiService: TournoiService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.tournoi.nom || this.tournoi.nbEquipe <= 0 || this.tournoi.frais < 0 || !this.tournoi.dateDebut || !this.tournoi.dateFin) {
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
