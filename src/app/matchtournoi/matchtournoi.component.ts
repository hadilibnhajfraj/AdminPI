import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournoiService } from '../service/tournoi.service';
import { TerrainService } from '../service/terrain.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-matchtournoi',
  templateUrl: './matchtournoi.component.html',
  styleUrls: ['./matchtournoi.component.css'],
})
export class MatchtournoiComponent implements OnInit {
  matchs: any[] = [];
  groupesParTour: { [key: number]: any[] } = {};
  selectedTournoiId: number | null = null;

  popupVisible = false;
  popupTerrainVisible = false;
  matchSelectionne: any = null;

  scoreEquipe1: number = 0;
  scoreEquipe2: number = 0;

  terrains: any[] = [];
  disponibilites: { [terrainId: number]: string[] } = {};

  terrainSelectionne: any = null;
  dateSelectionnee: string = '';
  gagnant: string | null = null;


  tourSuivantVisible = false;

  constructor(
    private route: ActivatedRoute,
    private tournoiService: TournoiService,
    private terrainService: TerrainService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.selectedTournoiId = +this.route.snapshot.paramMap.get('id')!;
    this.getMatchsParTournoi();
  }

  plagesHoraires: string[] = [
    '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
  ];
  
  getHeureFin(heure: string): string {
    const [h, m] = heure.split(':').map(Number);
    const fin = h + 2;
    const heuresFin = fin < 10 ? '0' + fin : '' + fin;
    const minutesFin = m < 10 ? '0' + m : '' + m;
    return `${heuresFin}:${minutesFin}`;
  }
  
  

  getMatchsParTournoi(): void {
    if (this.selectedTournoiId) {
      this.tournoiService.getMatchsParTournoi(this.selectedTournoiId).subscribe(
        (data) => {
          this.matchs = data;
          this.groupesParTour = this.groupByTour(this.matchs);
          this.verifierSiTourComplet();
        },
        (error) => console.error('Erreur lors du chargement des matchs', error)
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
    if (!this.matchSelectionne?.idMatch) return;
  
    // 🔒 Vérification des scores négatifs
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
        setTimeout(() => this.getMatchsParTournoi(), 300);
      },
      error: (err) => {
        console.error("Erreur MAJ score :", err);
        alert("Erreur lors de la mise à jour.");
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
    this.tourSuivantVisible = matchsDernierTour.every(
      m => m.scoreEquipe1 !== null && m.scoreEquipe2 !== null
    );
  
    // 👑 Vérifie s'il ne reste qu'une équipe gagnante (fin de tournoi)
    const equipesGagnantes = matchsDernierTour.map(m => {
      if (m.scoreEquipe1 > m.scoreEquipe2) {
        return m.equipes1[0]?.nom;
      } else if (m.scoreEquipe2 > m.scoreEquipe1) {
        return m.equipes1[1]?.nom;
      } else {
        return null; // match nul
      }
    }).filter(e => e !== null);
  
   // Vérifier si c'est vraiment le dernier match (1 seul match dans le tour)
if (matchsDernierTour.length === 1 && equipesGagnantes.length === 1) {
  this.gagnant = equipesGagnantes[0]!;
} else {
  this.gagnant = null;
}

  }
  

  genererTourSuivant(): void {
    if (this.selectedTournoiId) {
      this.tournoiService.genererTourSuivant(this.selectedTournoiId).subscribe({
        next: () => {
          alert("Tour suivant généré !");
          this.getMatchsParTournoi();
        },
        error: (err) => {
          console.error("Erreur génération tour :", err);
          alert("Erreur lors de la génération.");
          this.getMatchsParTournoi();
        }
      });
    }
  }

  ouvrirPopupTerrain(match: any): void {
    this.matchSelectionne = match;
    this.popupTerrainVisible = true;
    this.terrains = [];
    this.disponibilites = {};
    this.terrainSelectionne = null;
    this.dateSelectionnee = '';

    this.terrainService.getTerrains().subscribe({
      next: (terrainsData) => {
        this.terrains = terrainsData;
      },
      error: (err) => console.error("Erreur chargement terrains :", err)
    });
  }

  fermerPopupTerrain(): void {
    this.popupTerrainVisible = false;
    this.matchSelectionne = null;
    this.terrainSelectionne = null;
    this.dateSelectionnee = '';
  }

  selectionnerTerrain(terrain: any): void {
    this.terrainSelectionne = terrain;
    this.dateSelectionnee = '';
    this.disponibilites[terrain.id] = [];
  }

  chargerDisponibilites(): void {
    if (!this.terrainSelectionne?.id || !this.dateSelectionnee) return;

    this.terrainService.getDisponibilites(this.terrainSelectionne.id, this.dateSelectionnee)
      .subscribe({
        next: (dispos) => {
          this.disponibilites[this.terrainSelectionne.id] = dispos;
        },
        error: (err) => {
          console.error("Erreur chargement disponibilités :", err);
          this.disponibilites[this.terrainSelectionne.id] = [];
        }
      });
  }

  reserverTerrain(terrainId: number, date: string, heure: string): void {
    this.terrainService.reserverTerrain(terrainId, date, heure).subscribe({
      next: (message) => {
        alert(message);
        this.fermerPopupTerrain();
        this.getMatchsParTournoi(); // Si le terrain est aussi stocké côté match
      },
      error: (err) => {
        console.error("Erreur réservation :", err);
        alert("Erreur lors de la réservation.");
      }
    });
  }
}
