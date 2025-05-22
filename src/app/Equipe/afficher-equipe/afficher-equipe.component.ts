import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from '../../model/equipe';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-afficher-equipe',
  templateUrl: './afficher-equipe.component.html',
  styleUrls: ['./afficher-equipe.component.scss']
})
export class AfficherEquipeComponent implements OnInit {

  equipes: Equipe[] = [];
  private equipeDeletedSubscription!: Subscription;
  constructor(private equipeService: JoueurEquipeService, private router: Router) {}
 

  
 
  ngOnInit(): void {
    this.getEquipes();

    // S'abonner à la notification de suppression d'une équipe
    this.equipeDeletedSubscription = this.equipeService.equipeDeleted$.subscribe(() => {
      // Rafraîchir la liste des équipes après la suppression
      this.getEquipes();
    });
  }



//les fcts

getEquipes(): void {
  this.equipeService.getAllEquipes().subscribe(
    data => this.equipes = data,
    error => console.error('Erreur lors du chargement des équipes', error)
  );
}

supprimerEquipe(id: number): void {
  if (!confirm('Voulez-vous vraiment supprimer cette équipe ?')) {
    return;
  }
  this.equipeService.supprimerEquipe(id).subscribe(
    () => {
      // Notifier la suppression de l'équipe
      this.equipeService.notifyEquipeDeleted();
    },
    error => console.error('Erreur lors de la suppression de l\'équipe', error)
  );
}

modifyEquipe(id: number): void {
  this.router.navigate(['/modifier-equipe', id]);
}

shareLink(equipe: Equipe): void {
  const link = `${window.location.origin}/inscription-equipe/${equipe.idEquipe}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(
      () => alert('Lien copié : ' + link),
      () => prompt('Copiez ce lien :', link)
    );
  } else {
    prompt('Copiez ce lien :', link);
  }
}

getDisponibiliteClasse(disponible: boolean): string {
  return disponible ? 'available' : 'unavailable';
}

getDisponibiliteLabel(disponible: boolean): string {
  return disponible ? 'Disponible' : 'Indisponible';
}
ngOnDestroy(): void {
  // Se désabonner de l'événement lors de la destruction du composant
  if (this.equipeDeletedSubscription) {
    this.equipeDeletedSubscription.unsubscribe();
  }
}
}


