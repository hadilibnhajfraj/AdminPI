import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Equipe } from '../../model/equipe';

@Component({
  selector: 'app-supprimer-equipe',
  templateUrl: './supprimer-equipe.component.html',
  styleUrls: ['./supprimer-equipe.component.scss']
})
export class SupprimerEquipeComponent implements OnInit {


  equipeId!: number;
  equipe!: Equipe;
  isLoading = true;
  isDeleted = false;

  constructor(
    private route: ActivatedRoute,
    private equipeService: JoueurEquipeService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.equipeId = +this.route.snapshot.paramMap.get('id')!;
    this.getEquipe();
  }

  getEquipe(): void {
    this.equipeService.getEquipeById(this.equipeId).subscribe({
      next: (data) => {
        this.equipe = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement', err);
        this.isLoading = false;
      }
    });
  }

  onDelete(): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'équipe "${this.equipe.nom}" ?`)) {
      this.equipeService.supprimerEquipe(this.equipeId).subscribe({
        next: () => {
          this.isDeleted = true;
          // Notifier le parent que l'équipe a été supprimée
          this.equipeService.notifyEquipeDeleted();
          
          // Après la suppression, on peut directement naviguer ou recharger
          setTimeout(() => {
            this.router.navigate(['/afficher-equipe']);  // Redirige après un délai
          }, 2000);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  onReturn(): void {
    this.router.navigate(['/afficher-equipe']);
  }

}
