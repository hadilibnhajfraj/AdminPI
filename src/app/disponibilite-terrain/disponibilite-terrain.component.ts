import { Component, OnInit } from '@angular/core';
import { DisponibiliteTerrain } from '../model/disponibiliteTerrain.model';
import { TerrainService } from '../services/terrain.service';
import { DisponibiliteTerrainService } from '../services/disponibilite-terrain.service';
import { Terrain } from '../model/terrain.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disponibilite-terrain',
  templateUrl: './disponibilite-terrain.component.html',
  styleUrls: ['./disponibilite-terrain.component.scss']
})
export class DisponibiliteTerrainComponent {
  dispo: DisponibiliteTerrain = new DisponibiliteTerrain();
  disponibilites: DisponibiliteTerrain[] = [];
  terrains: Terrain[] = [];
  jours: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  selectedId?: number;

  constructor(
    private dispoService: DisponibiliteTerrainService,
    private terrainService: TerrainService
  ) {}

  ngOnInit(): void {
    this.loadTerrains();
    this.getDisponibilites();
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe(data => this.terrains = data);
  }

  getDisponibilites(): void {
    this.dispoService.getAllDisponibilites().subscribe(data => this.disponibilites = data);
  }

  addDisponibilite(): void {
    if (this.dispo.terrain && typeof this.dispo.terrain === 'number') {
      this.dispo.terrain = { id: this.dispo.terrain };
    }
    this.dispoService.addDisponibilite(this.dispo).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Disponibilité ajoutée avec succès!'
      });
      this.getDisponibilites();
      this.dispo = new DisponibiliteTerrain();
    });
  }

  deleteDisponibilite(id: number): void {
    Swal.fire({
      title: 'Confirmation de suppression',
      text: "Êtes-vous sûr de vouloir supprimer cette disponibilité?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dispoService.deleteDisponibilite(id).subscribe(() => {
          this.getDisponibilites();
          if (this.selectedId === id) {
            this.dispo = new DisponibiliteTerrain();
            this.selectedId = undefined;
          }
          Swal.fire(
            'Supprimé!',
            'La disponibilité a été supprimée.',
            'success'
          );
        });
      }
    });
  }


  selectDisponibilite(d: DisponibiliteTerrain): void {
    this.dispo = { ...d };
    this.selectedId = d.id;
  }

  updateDisponibilite(): void {
    if (!this.selectedId) return;
    
    Swal.fire({
      title: 'Confirmer la modification',
      text: "Êtes-vous sûr de vouloir modifier cette disponibilité?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dispoService.updateDisponibilite(this.selectedId, this.dispo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Disponibilité modifiée avec succès!'
          });
          this.getDisponibilites();
          this.dispo = new DisponibiliteTerrain();
          this.selectedId = undefined;
        });
      }
    });
  }
  
  getNomTerrain(terrain: any): string {
    const terrainObj = this.terrains.find(t => t.id === (terrain?.id || terrain));
    return terrainObj ? terrainObj.nom : '';
  }
}