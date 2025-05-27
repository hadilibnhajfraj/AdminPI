import { Component, OnInit } from '@angular/core';
import { TerrainService } from '../service/terrain.service'; // adapter le chemin
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispo-terrain',
  templateUrl: './dispo-terrain.component.html',
  styleUrls: ['./dispo-terrain.component.css']
})
export class DispoTerrainComponent implements OnInit {

  terrainId = 0; // ID du terrain sélectionné (exemple fixe)
  dateSelectionnee: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  disponibilites: string[] = [];
  tranchesHoraires: string[] = [];

  constructor(private terrainService: TerrainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.terrainId = +this.route.snapshot.paramMap.get('id')!;
    this.genererTranchesHoraires();
    this.chargerDisponibilites();
  }

  onDateChange(event: any): void {
    this.dateSelectionnee = event.target.value;
    this.chargerDisponibilites();
  }

  genererTranchesHoraires(): void {
    const debut = 8; // 08:00
    const fin = 22;  // 22:00
    this.tranchesHoraires = []; // Assure que c’est bien un tableau
  
    for (let heure = debut; heure < fin; heure += 2) {
      const h1 = (heure < 10 ? '0' + heure : heure) + ':00';
      const h2Heure = heure + 2;
      const h2 = (h2Heure < 10 ? '0' + h2Heure : h2Heure) + ':00';
      const horaire = h1 + ' - ' + h2;
  
      this.tranchesHoraires.push(horaire); 
    }
  }
  

  chargerDisponibilites(): void {
    this.terrainService.getDisponibilites(this.terrainId, this.dateSelectionnee).subscribe({
      next: (dispo) => {
        this.disponibilites = dispo;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des disponibilités", err);
        this.disponibilites = [];
      }
    });
  }

  estReservee(heureDebut: string): boolean {
    return !this.disponibilites.includes(heureDebut);
  }

  reserver(heure: string): void {
    this.terrainService.reserverTerrain(this.terrainId, this.dateSelectionnee, heure).subscribe({
      next: (msg) => {
        alert(msg);
        this.chargerDisponibilites();
      },
      error: (err) => {
        console.error("Erreur de réservation", err);
        alert("Échec de la réservation.");
      }
    });
  }
}
