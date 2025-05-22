import { Component, OnInit } from '@angular/core';

import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { ActivatedRoute } from '@angular/router';
import { Joueur } from '../../model/joueur';
import { Equipe } from '../../model/equipe';

@Component({
  selector: 'app-retirer-joueur',
  templateUrl: './retirer-joueur.component.html',
  styleUrls: ['./retirer-joueur.component.scss']
})
export class RetirerJoueurComponent implements OnInit {

idEquipe!: number;
  joueursEquipe: Joueur[] = [];
  
    constructor(
      private joueurEquipeService: JoueurEquipeService,
      private route: ActivatedRoute
    ) {}


 

    ngOnInit(): void {
      this.idEquipe = +this.route.snapshot.paramMap.get('id')!;
      this.chargerEquipe();
    }
  
    chargerEquipe(): void {
      this.joueurEquipeService.getEquipeById(this.idEquipe).subscribe({
        next: (equipe: Equipe) => {
          // this.joueursEquipe = equipe.joueurs || [];
          this.joueursEquipe = (equipe.joueurs || []).map(j => ({ nom: j } as Joueur));

        },
        error: (err) => {
          console.error('Erreur chargement équipe', err);
        }
      });
    }
  /// retirerJoueur
    retirerJoueur(idJoueur: number): void {
      this.joueurEquipeService.retirerJoueur(this.idEquipe, idJoueur).subscribe({
        next: () => {
          this.joueursEquipe = this.joueursEquipe.filter(j => j.idJoueur !== idJoueur);
          console.log(`Joueur ${idJoueur} retiré avec succès`);
        },
        error: (err) => {
          console.error('Erreur lors du retrait', err);
        }
      });
    }

}
