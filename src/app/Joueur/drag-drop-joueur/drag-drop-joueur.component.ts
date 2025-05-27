import { Component, OnInit } from '@angular/core';

import { Joueur } from '../../model/joueur';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Equipe } from '../../model/equipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-drag-drop-joueur',
  templateUrl: './drag-drop-joueur.component.html',
  styleUrls: ['./drag-drop-joueur.component.scss']
})
export class DragDropJoueurComponent implements OnInit {
  unassignedPlayers: Joueur[] = [];
  teamPlayers: Joueur[] = [];
  teamId = 1; // Tu peux remplacer ça dynamiquement
  teamsList: Equipe[]= [];

  constructor(private joueurService: JoueurEquipeService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
      this.cdRef.detectChanges();

  }

  loadData(): void {
    console.log("load data function is working")
    this.joueurService.getUnassignedJoueurs().subscribe(players => this.unassignedPlayers = players);
    this.joueurService.getJoueursByEquipe(this.teamId).subscribe(players => this.teamPlayers = players);
    this.joueurService.getAllEquipes().subscribe(equipes=> this.teamsList= equipes);
    console.log("Unassigned Players:", this.unassignedPlayers);
    console.log("Team Players:", this.teamPlayers);
  }
drop(event: CdkDragDrop<Joueur[]>) {
  console.log('--- DROP EVENT START ---');
  console.log('Previous Container:', event.previousContainer.id);
  console.log('Current Container:', event.container.id);
  console.log('Is same container?', event.previousContainer === event.container);

  if (!event || !event.container || !event.previousContainer) {
    console.error('Invalid drop event');
    return;
  }

  if (event.previousContainer === event.container) {
    console.log('Same container, ignoring');
    return;
  }

  const joueur = event.previousContainer.data[event.previousIndex];
  if (!joueur) {
    console.error('No player found at drop position');
    return;
  }

  console.log(`Moving player ${joueur.nom} ${joueur.prenom}`);

  // Immediately update UI
  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
  );

  // Force change detection
  this.unassignedPlayers = [...this.unassignedPlayers];
  this.teamPlayers = [...this.teamPlayers];

  // Handle server update
  if (event.container.id === 'teamPlayersList') {
    console.log('Assigning to team');
    this.joueurService.assignJoueurToEquipe(joueur.idJoueur, this.teamId).subscribe({
      error: err => {
        console.error('Assignment failed', err);
        // Revert on error
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
    });
  } else if (event.container.id === 'unassignedPlayersList') {
    console.log('Removing from team');
    this.joueurService.removeJoueurFromEquipe(joueur.idJoueur, this.teamId).subscribe({
      error: err => {
        console.error('Removal failed', err);
        // Revert on error
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
    });
  }
  console.log('--- DROP EVENT END ---');
}
onTeamChange(): void {
  this.joueurService.getJoueursByEquipe(this.teamId).subscribe(players => {
    this.teamPlayers = players;
  });
}



  // Fonction send MAIL + SMS

  /*
  saveAndNotify(): void {
    this.joueurService.notifyJoueursAffectes(this.teamId).subscribe({
      next: () => alert('📨 Joueurs notifiés avec succès !'),
      error: err => console.error('Erreur lors de la notification', err)
    });
  }
  */

}
