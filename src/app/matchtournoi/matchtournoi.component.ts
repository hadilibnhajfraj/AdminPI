import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournoiService } from '../service/tournoi.service';

@Component({
  selector: 'app-matchtournoi',
  templateUrl: './matchtournoi.component.html',
  styleUrls: ['./matchtournoi.component.css'],
})
export class MatchtournoiComponent implements OnInit {
  matchs: any[] = [];
  groupesParTour: { [key: number]: any[] } = {}; // Pour grouper les matchs par tour
  selectedTournoiId: number | null = null;

  popupVisible = false;
  matchSelectionne: any = null;
  scoreEquipe1: number = 0;
  scoreEquipe2: number = 0;

  tourSuivantVisible = false;

  constructor(
    private route: ActivatedRoute,
    private tournoiService: TournoiService
  ) {}

  ngOnInit(): void {
    this.selectedTournoiId = +this.route.snapshot.paramMap.get('id')!;
    this.getMatchsParTournoi();
  }

  getMatchsParTournoi(): void {
    if (this.selectedTournoiId) {
      this.tournoiService.getMatchsParTournoi(this.selectedTournoiId).subscribe(
        (data) => {
          this.matchs = data;
          this.groupesParTour = this.groupByTour(this.matchs);
          this.verifierSiTourComplet();
        },
        (error) => {
          console.error('Erreur lors du chargement des matchs', error);
        }
      );
    }
  }

  groupByTour(matchs: any[]): { [key: number]: any[] } {
    const groupes: { [key: number]: any[] } = {};
    matchs.forEach((match) => {
      if (!groupes[match.tour]) {
        groupes[match.tour] = [];
      }
      groupes[match.tour].push(match);
    });
    return groupes;
  }

  ouvrirPopup(match: any): void {
    this.matchSelectionne = match;
    this.scoreEquipe1 = match.scoreEquipe1 ?? 0;
    this.scoreEquipe2 = match.scoreEquipe2 ?? 0;
    this.popupVisible = true;
  }

  fermerPopup(): void {
    this.popupVisible = false;
    this.matchSelectionne = null;
  }

  validerMiseAJour(): void {
    if (!this.matchSelectionne || !this.matchSelectionne.idMatch) {
      console.error("ID de match manquant");
      return;
    }

    const matchId = this.matchSelectionne.idMatch;

    this.tournoiService.mettreAJourScores(
      matchId,
      this.scoreEquipe1,
      this.scoreEquipe2
    ).subscribe({
      next: (_) => {
        alert("Score mis à jour avec succès !");
        this.fermerPopup();
        setTimeout(() => this.getMatchsParTournoi(), 300);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
        alert("Erreur lors de la mise à jour du score.");
        this.fermerPopup();
      }
    });
  }

  verifierSiTourComplet(): void {
    if (this.matchs.length === 0) {
      this.tourSuivantVisible = false;
      return;
    }

    const dernierTour = Math.max(...this.matchs.map(m => m.tour));
    const matchsDernierTour = this.matchs.filter(m => m.tour === dernierTour);
    const tousScoresRenseignes = matchsDernierTour.every(
      m => m.scoreEquipe1 !== null && m.scoreEquipe2 !== null
    );

    this.tourSuivantVisible = tousScoresRenseignes;
  }

  genererTourSuivant(): void {
    if (this.selectedTournoiId) {
      this.tournoiService.genererTourSuivant(this.selectedTournoiId).subscribe({
        next: (_) => {
          alert("Tour suivant généré avec succès !");
          this.getMatchsParTournoi();
        },
        error: (err) => {
          console.error("Erreur lors de la génération du tour suivant :", err);
          alert("Erreur lors de la génération du tour suivant. Les données ont peut-être été générées malgré tout.");
          this.getMatchsParTournoi(); // Recharge même si erreur
        }
      });
    }
  }
}
