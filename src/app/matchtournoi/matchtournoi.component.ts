import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournoiService } from '../service/tournoi.service';

@Component({
  selector: 'app-matchtournoi',
  templateUrl: './matchtournoi.component.html',
  styleUrls: ['./matchtournoi.component.css']
})
export class MatchtournoiComponent implements OnInit {
  matchs: any[] = [];
  selectedTournoiId: number | null = null;

  constructor(private route: ActivatedRoute, private tournoiService: TournoiService) {}

  ngOnInit(): void {
    // Récupérer l'ID du tournoi depuis l'URL
    this.selectedTournoiId = +this.route.snapshot.paramMap.get('id')!;
    this.getMatchsParTournoi();
  }

  // Charger les matchs d'un tournoi sélectionné
  getMatchsParTournoi(): void {
    if (this.selectedTournoiId) {
      this.tournoiService.getMatchsParTournoi(this.selectedTournoiId).subscribe(
        (data) => {
          this.matchs = data; // Stocke les matchs récupérés
        },
        (error) => {
          console.error('Erreur lors du chargement des matchs', error);
        }
      );
    }
  }
}
