import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournoiService } from '../service/tournoi.service';
import { TerrainService } from '../service/terrain.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-match-championnat',
  templateUrl: './match-championnat.component.html',
  styleUrls: ['./match-championnat.component.css'],
})
export class MatchChampionnatComponent implements OnInit {
  ongletActif: 'calendrier' | 'classement' = 'calendrier';
  tournoiId!: number;
  calendrier: any[] = [];
  classement: any[] = [];

  popupVisible = false;
  matchSelectionne: any = null;
  scoreEquipe1?: number;
  scoreEquipe2?: number;
  cartonsJaunesEquipe1?: number;
cartonsRougesEquipe1?: number;
cornersEquipe1?: number;
cartonsJaunesEquipe2?: number;
cartonsRougesEquipe2?: number;
cornersEquipe2?: number;

statsVisible = false;
  statistiques: any[] = [];
  messageSuccesVisible = false;


  constructor(
    private route: ActivatedRoute,
    private tournoiService: TournoiService,
    private terrainService: TerrainService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.tournoiId = +this.route.snapshot.paramMap.get('id')!;
    this.getMatchsParTournoi();
    this.chargerClassement();
  }

  activerOnglet(onglet: 'calendrier' | 'classement'): void {
    this.ongletActif = onglet;
  }

  getMatchsParTournoi(): void {
    if (this.tournoiId) {
      this.tournoiService.getMatchsParTournoi(this.tournoiId).subscribe({
        next: (data) => {
          this.calendrier = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des matchs', err);
          this.calendrier = [];
        },
      });
    }
  }

  chargerClassement(): void {
    this.tournoiService.getClassement(this.tournoiId).subscribe({
      next: (data) => {
        this.classement = data;
        // Le tri est déjà fait dans le backend, pas besoin de refaire ici
      },
      error: (err) => {
        console.error('Erreur chargement classement', err);
      },
    });
  }
  
  
  calculerPoints(equipe: any): number {
    const victoires = equipe.victoires || 0;
    const nuls = equipe.nuls || 0;
    return victoires * 3 + nuls;
  }
  
  

  ouvrirPopup(match: any): void {
    this.matchSelectionne = match;
    this.scoreEquipe1 = match.scoreEquipe1 ?? 0;
    this.scoreEquipe2 = match.scoreEquipe2 ?? 0;
    this.popupVisible = true;
     this.statsVisible = false;
  }

  fermerPopup(): void {
    this.popupVisible = false;
    this.matchSelectionne = null;
       this.statsVisible = false;
       
  }

  validerMiseAJour(): void {
  if (!this.matchSelectionne?.idMatch) return;

  if (this.scoreEquipe1 < 0 || this.scoreEquipe2 < 0) {
    alert("Les scores ne peuvent pas être négatifs !");
    return;
  }

  this.tournoiService.mettreAJourScores(
    this.matchSelectionne.idMatch,
    this.scoreEquipe1,
    this.scoreEquipe2,
    this.cartonsJaunesEquipe1,
    this.cartonsRougesEquipe1,
    this.cornersEquipe1,
    this.cartonsJaunesEquipe2,
    this.cartonsRougesEquipe2,
    this.cornersEquipe2
  ).subscribe({
    next: () => {
      this.fermerPopup();
      this.messageSuccesVisible = true;

      setTimeout(() => {
        this.messageSuccesVisible = false;
        this.getMatchsParTournoi();
        this.chargerClassement();
      }, 3000);
    },
    error: (err) => {
      console.error("Erreur MAJ score :", err);
      alert("Erreur lors de la mise à jour.");
      this.fermerPopup();
    }
  });
}

 afficherStatistiques(match: any): void {
  this.tournoiService.getStatistiquesParMatch(match.idMatch).subscribe({
    next: (data) => {
      if (data.length === 2) {
        const equipe1 = data[0];
        const equipe2 = data[1];

        this.statistiques = [
          {
            nomStat: 'Score',
            valeurEquipe1: equipe1.score,
            valeurEquipe2: equipe2.score
          },
          {
            nomStat: 'Cartons Jaunes',
            valeurEquipe1: equipe1.cartonsJaunes,
            valeurEquipe2: equipe2.cartonsJaunes
          },
          {
            nomStat: 'Cartons Rouges',
            valeurEquipe1: equipe1.cartonsRouges,
            valeurEquipe2: equipe2.cartonsRouges
          },
          {
            nomStat: 'Corners',
            valeurEquipe1: equipe1.corners,
            valeurEquipe2: equipe2.corners
          }
        ];
      }

      this.matchSelectionne = match;
      this.statsVisible = true;
      this.popupVisible = false;
    },
    error: (err) => {
      console.error("Erreur récupération stats:", err);
      alert("Erreur lors de la récupération des statistiques.");
    }
  });
}



  

  fermerStats(): void {
    this.statsVisible = false;
    this.matchSelectionne = null;
  }

  calculerLargeur(valeur: number, valeur1: number, valeur2: number): number {
  const max = Math.max(valeur1, valeur2);
  if (max === 0) return 0;
  return (valeur / max) * 100;
}



}
