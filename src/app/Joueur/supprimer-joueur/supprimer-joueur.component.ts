import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Joueur } from '../../model/joueur';

@Component({
  selector: 'app-supprimer-joueur',
  templateUrl: './supprimer-joueur.component.html',
  styleUrls: ['./supprimer-joueur.component.scss']
})
export class SupprimerJoueurComponent implements OnInit {

  idJoueur!: number;
  joueur!: Joueur;
  isLoading = true;
  isDeleted = false;

  constructor(
    private route: ActivatedRoute,
    private joueurService: JoueurEquipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idJoueur = +this.route.snapshot.paramMap.get('id')!;
    this.chargerJoueur();
  }

  chargerJoueur(): void {
    this.joueurService.getJoueurById(this.idJoueur).subscribe({
      next: (data) => {
        this.joueur = data;
        this.isLoading = false;


      },
      error: (err) => {
        console.error('Erreur de chargement du joueur', err);
        this.isLoading = false;
      }
    });
  }

  
  supprimerJoueur(): void {
    if (confirm(`Confirmez-vous la suppression ?`)) {
      this.joueurService.supprimerJoueur(this.idJoueur).subscribe({
        next: () => {
          this.isDeleted = true;
  
          // ✅ Affiche un message puis redirige après 2 secondes
          alert('✅ Joueur supprimé avec succès !');
  
          // ✅ Recharger proprement la page après navigation
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/afficher-joueur']);
            });
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du joueur', err);
        }
      });
    }
  }
  

}

