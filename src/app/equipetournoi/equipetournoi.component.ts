import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TournoiService } from '../service/tournoi.service';
import { ActivatedRoute } from '@angular/router';
import { Equipe } from '../model/Equipe';
import { Location } from '@angular/common'; // Service pour revenir à la page précédente

@Component({
  selector: 'app-equipetournoi',
  templateUrl: './equipetournoi.component.html',
  styleUrls: ['./equipetournoi.component.css']
})
export class EquipetournoiComponent implements OnInit {
  equipes: Equipe[] = [];
  equipesNonInscrites: Equipe[] = [];  // Liste des équipes non inscrites dans le tournoi
  tournoiId!: number;
  tournoi: any;  // Propriété pour stocker les détails du tournoi
  showConfirmation: boolean = false;  // Pour contrôler l'affichage du pop-up de confirmation
  showAddEquipeDialog: boolean = false;  // Pour afficher le pop-up pour ajouter une équipe
  selectedEquipe: Equipe | null = null;  // L'équipe sélectionnée pour la désaffectation

  constructor(
    private tournoiService: TournoiService,
    private route: ActivatedRoute,
    private location: Location,  // Service pour revenir à la page précédente
    private cdr: ChangeDetectorRef  // Pour forcer la détection des changements
  ) {}

  ngOnInit(): void {
    this.tournoiId = +this.route.snapshot.paramMap.get('idTournoi')!;
    this.getEquipes();
    this.getEquipesNonInscrites();
    this.getTournoiDetails();  // Charger les détails du tournoi
  }

  // Nouvelle méthode pour obtenir les détails du tournoi
  getTournoiDetails(): void {
    this.tournoiService.getTournoiById(this.tournoiId).subscribe(
      (data) => {
        this.tournoi = data;  // Stocker les détails du tournoi
        console.log('Détails du tournoi:', this.tournoi);
      },
      (error) => {
        console.error('Erreur lors du chargement du tournoi', error);
      }
    );
  }

  getEquipes(): void {
    this.tournoiService.getEquipesParTournoi(this.tournoiId).subscribe(
      (data) => {
        this.equipes = data;  // Mettre à jour la liste des équipes inscrites
        console.log('Equipes inscrites:', this.equipes); // Log pour vérifier les équipes inscrites
      },
      (error) => {
        console.error('Erreur lors du chargement des équipes', error);
      }
    );
  }

  getEquipesNonInscrites(): void {
    this.tournoiService.getEquipesNonInscrites(this.tournoiId).subscribe(
      (data) => {
        this.equipesNonInscrites = data;  // Mettre à jour la liste des équipes non inscrites
        console.log('Equipes non inscrites:', this.equipesNonInscrites); // Log pour vérifier les équipes non inscrites
        this.cdr.detectChanges();  // Forcer la détection des changements pour mettre à jour la vue
      },
      (error) => {
        console.error('Erreur lors du chargement des équipes non inscrites', error);
      }
    );
  }

  openConfirmationDialog(equipe: Equipe): void {
    this.selectedEquipe = equipe;  // Enregistrer l'équipe sélectionnée
    this.showConfirmation = true;  // Afficher le pop-up de confirmation
  }

  closeConfirmationDialog(): void {
    this.showConfirmation = false;  // Fermer le pop-up
    this.selectedEquipe = null;  // Réinitialiser l'équipe sélectionnée
  }

  desaffecterEquipe(): void {
    if (this.selectedEquipe) {
      this.tournoiService.desaffecterEquipeDuTournoi(this.tournoiId, this.selectedEquipe.idEquipe).subscribe(
        (response) => {
          console.log(response);  // Log de la réponse
          this.getEquipes();  // Rafraîchir la liste des équipes
          this.closeConfirmationDialog();  // Fermer le pop-up après confirmation
        },
        (error) => {
          console.error('Erreur lors de la désaffectation de l\'équipe', error);
        }
      );
    }
  }

  openAddEquipeDialog(): void {
    this.showAddEquipeDialog = true;  // Afficher le pop-up d'ajout d'équipe
  }

  closeAddEquipeDialog(): void {
    this.showAddEquipeDialog = false;  // Fermer le pop-up d'ajout d'équipe
  }

  addEquipeToTournoi(equipe: Equipe): void {
    // Appel à la méthode affecterEquipesATournoi avec un tableau contenant l'ID de l'équipe
    this.tournoiService.affecterEquipesATournoi(this.tournoiId, [equipe.idEquipe]).subscribe(
      (response) => {
        console.log(response);  // Log de la réponse
        this.getEquipes();  // Rafraîchir la liste des équipes
        this.closeAddEquipeDialog();  // Fermer le pop-up d'ajout d'équipe après l'ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'équipe', error);
      }
    );
  }

  goBack(): void {
    this.location.back();  // Revenir à la page précédente
  }
}
