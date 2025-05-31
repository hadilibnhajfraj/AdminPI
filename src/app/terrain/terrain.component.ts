import { Component, OnInit } from '@angular/core';
import { Terrain } from '../model/terrain.model';
import { TerrainService } from '../services/terrain.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { WeatherService } from '../services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit {

  terrain: Terrain = new Terrain();
  terrains: Terrain[] = [];
  selectedId?: number;
  weather: any;
  city: string = 'Tunis'; 
  

  constructor(private terrainService: TerrainService,private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getTerrains();

    this.weatherService.getWeatherByCity(this.city).subscribe(data => {
      this.weather = data;
    });
  }

  getTerrains(): void {
    this.terrainService.getAllTerrains().subscribe(data => {
      this.terrains = data;
    });
  }

  addTerrain(): void {
    this.terrainService.addTerrain(this.terrain).subscribe(() => {
      this.getTerrains();
      this.terrain = new Terrain();
      Swal.fire({
        icon: 'success',
        title: 'Ajout réussi!',
        text: 'Le terrain a été ajouté avec succès!',
      });
    });
  }

  deleteTerrain(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.terrainService.deleteTerrain(id).subscribe(() => {
          this.getTerrains();
          if (this.selectedId === id) {
            this.terrain = new Terrain();
            this.selectedId = undefined;
          }
          Swal.fire(
            'Supprimé!',
            'Le terrain a été supprimé.',
            'success'
          );
        });
      }
    });
  }

  updateTerrain(): void {
    if (!this.selectedId) return;
    
    Swal.fire({
      title: 'Confirmer la modification',
      text: "Êtes-vous sûr de vouloir modifier ce terrain?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.terrainService.updateTerrain(this.selectedId, this.terrain).subscribe(() => {
          this.getTerrains();
          this.terrain = new Terrain();
          this.selectedId = undefined;
          Swal.fire(
            'Modifié!',
            'Le terrain a été mis à jour.',
            'success'
          );
        });
      }
    });
  }

  selectTerrain(t: Terrain): void {
    this.terrain = { ...t }; // Copie pour éviter mutation directe
    this.selectedId = t.id;
  }

  async exportToPDF(): Promise<void> {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Liste des Terrains avec QR Code', 14, 15);
  
    let y = 25;
  
    for (const terrain of this.terrains) {
      const qrText = `Terrain: ${terrain.nom}`;
      
      // Attente de génération QR code
      const qrDataURL = await QRCode.toDataURL(qrText);
  
      // Informations terrain
      doc.text(`Nom : ${terrain.nom}`, 14, y);
      doc.text(`Adresse : ${terrain.adresse}`, 14, y + 6);
      doc.text(`Prix : ${terrain.prix} DT`, 14, y + 12);
      doc.text(`Surface : ${terrain.surface}`, 14, y + 18);
  
      // Ajouter le QR Code à droite
      doc.addImage(qrDataURL, 'PNG', 140, y, 40, 40);
  
      // Avancer la position Y
      y += 50;
  
      // Sauter à une nouvelle page si nécessaire
      if (y > 270) {
        doc.addPage();
        y = 25;
      }
    }
  
    doc.save('terrains-avec-qrcode.pdf');
  }
  
  

}
