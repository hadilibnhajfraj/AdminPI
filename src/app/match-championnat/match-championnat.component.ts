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
  }

  fermerPopup(): void {
    this.popupVisible = false;
    this.matchSelectionne = null;
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
      this.scoreEquipe2
    ).subscribe({
      next: () => {
        alert("Score mis à jour !");
        this.fermerPopup();
  
        // Actualisation des matchs pour refléter les nouveaux scores
        setTimeout(() => {
          this.getMatchsParTournoi();
          this.chargerClassement();
        }, 300);
      },
      error: (err) => {
        console.error("Erreur MAJ score :", err);
        alert("Erreur lors de la mise à jour.");
        this.fermerPopup();
      }
    });
  }
  
}
