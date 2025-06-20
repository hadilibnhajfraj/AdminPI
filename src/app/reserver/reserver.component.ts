import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonServiceServiceService } from '../../services/mon-service-service.service';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styleUrls: ['./reserver.component.scss']
})
export class ReserverComponent implements OnInit {
   showModal = false; 
  tournois: any[] = [];
  matches: any[] = [];
  soldOutMap: { [id: number]: boolean } = {};
  activeList: 'tournoi' | 'match' | null = null;

  selectedMatchId: number | null = null;
 
  reservationForm!: FormGroup;

  constructor(
    private reservationService: MonServiceServiceService,
    private fb: FormBuilder
  ) {
  console.log('ReservationService:', reservationService);
  console.log('FormBuilder:', fb);
}

  ngOnInit(): void {
    this.remplirEvenements();
    this.initForm();
    console.log('Component initialized');
    
  }

  initForm() {
   this.reservationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)]], // Noms uniquement avec des lettres, accents et tirets
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)]], // Prénoms uniquement avec des lettres, accents et tirets
      email: ['', [Validators.required, Validators.email]], // Email valide
      idTournoi: [null],
      nombrePlaces: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  remplirEvenements() {
    this.reservationService.remplirEvenements().subscribe({
      next: () => console.log("Événements à venir remplis."),
      error: err => console.error("Erreur lors du remplissage :", err)
    });
  }

  showList(type: 'tournoi' | 'match') {
    this.activeList = type;

    if (type === 'tournoi') {
      this.matches = [];
      this.reservationService.getTournois().subscribe({
        next: data => {
          this.tournois = data;
          this.checkSoldOutForTournois(data);
        },
        error: err => console.error('Erreur tournois', err)
      });
    } else {
      this.tournois = [];
      this.loadMatches();
    }
  }

  checkSoldOutForTournois(tournois: any[]) {
    tournois.forEach(t => {
      this.reservationService.isTournoiSoldOut(t.idTournoi).subscribe({
        next: result => this.soldOutMap[t.idTournoi] = result,
        error: err => console.error(`Erreur pour tournoi ${t.idTournoi}`, err)
      });
    });
  }

  loadMatches() {
    this.reservationService.getEvenementsAVenirSimplified().subscribe({
      next: data => {
        this.matches = data.map(m => ({
          id: m.id,
          nomEquipe1: m.nomEquipe1,
          nomEquipe2: m.nomEquipe2,
          nomTerrain: m.nomTerrain,
          adresseTerrain: m.adresseTerrain,
          dateDebut: m.dateDebut,
          heureDebut: m.heureDebut,
          nomTournoi: m.nomTournoi,
        }));
      },
      error: err => console.error('Erreur chargement matchs', err)
    });
  }

  ouvrirFormulaire(matchId: number) {
    console.log('Opening modal for match:', matchId);
    this.selectedMatchId = matchId;
    this.showModal = true;
  }

  fermerFormulaire() {
    this.showModal = false;
    this.reservationForm.reset();
  }

  submitReservation() {
    if (this.reservationForm.invalid || this.selectedMatchId == null) return;

    const formData = this.reservationForm.value;
    this.reservationService
      .reserverEvenement(this.selectedMatchId, formData)
      .subscribe({
        next: () => {
          alert("Réservation en attente de confirmation !");
          this.fermerFormulaire();
        },
        error: err => {
          alert("Erreur lors de la réservation : " + err.error.message);
        }
      });
  }
}
