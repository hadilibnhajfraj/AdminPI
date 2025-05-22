import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Joueur } from '../../model/joueur';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';

@Component({
  selector: 'app-afficher-joueur',
  templateUrl: './afficher-joueur.component.html',
  styleUrls: ['./afficher-joueur.component.scss']
})
export class AfficherJoueurComponent implements OnInit {
  joueurs: Joueur[] = [];

  constructor(
    private equipeService: JoueurEquipeService,
    private router: Router   
  ) {}

  ngOnInit(): void {
    this.loadJoueurs();
  }

  
  loadJoueurs(): void {
    this.equipeService.getAllJoueurs().subscribe({
      next: data => {
        console.log('Joueurs chargés :', data);  
        this.joueurs = data;
      },
      error: err => console.error('Erreur chargement joueurs', err)
    });
  }
  
  supprimerJoueur(id: number): void {
    if (!confirm('Confirmer la suppression ?')) return;
    this.equipeService.supprimerJoueur(id).subscribe({
      next: () => this.loadJoueurs(),
      error: err => console.error('Erreur suppression joueur', err)
    });
  }

  modifierJoueur(id: number): void {
    console.log("button clicked with user id: "+id)
    // ← méthode qui redirige vers /modifier-joueur/:id
    this.router.navigate(['/modifier-joueur', id]);
  }
}





