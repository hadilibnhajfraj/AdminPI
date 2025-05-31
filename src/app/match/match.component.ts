import { Component, OnInit } from '@angular/core';
import { MatchFo } from '../model/match.model';
import { MatchService } from '../services/match.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  match: MatchFo = new MatchFo();
  matchs: MatchFo[] = [];
  selectedId?: number;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.getMatchs();
  }

  getMatchs(): void {
    this.matchService.getAllMatchs().subscribe(data => {
      this.matchs = data;
    });
  }

  addMatch(): void {
    this.matchService.addMatch(this.match).subscribe(() => {
      this.getMatchs();
      this.match = new MatchFo();
      Swal.fire({
        icon: 'success',
        title: 'Ajout réussi!',
        text: 'Le match a été ajouté avec succès!',
      });
    });
  }

  deleteMatch(id: number): void {
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
        this.matchService.deleteMatch(id).subscribe(() => {
          this.getMatchs();
          if (this.selectedId === id) {
            this.match = new MatchFo();
            this.selectedId = undefined;
          }
          Swal.fire(
            'Supprimé!',
            'Le match a été supprimé.',
            'success'
          );
        });
      }
    });
  }

  updateMatch(): void {
    if (!this.selectedId) return;
    
    Swal.fire({
      title: 'Confirmer la modification',
      text: "Êtes-vous sûr de vouloir modifier ce match?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.matchService.updateMatch(this.selectedId, this.match).subscribe(() => {
          this.getMatchs();
          this.match = new MatchFo();
          this.selectedId = undefined;
          Swal.fire(
            'Modifié!',
            'Le match a été mis à jour.',
            'success'
          );
        });
      }
    });
  }

  selectMatch(m: MatchFo): void {
    this.match = { ...m };
    this.selectedId = m.idMatch;
  }

   exportToPDF(): void {
      const doc = new jsPDF();
  
      doc.text('Liste des Terrains', 14, 10);
  
      autoTable(doc, {
        head: [['Nom', 'Adresse', 'Nombre de jour', 'Date Match']],
        body: this.matchs.map(t => [
          t.nom,
          t.adresse,
          t.nb_joueur?.toString() || '',
          t.dateMatch
        ])
      });
  
      doc.save('matchs.pdf');
    }
}
