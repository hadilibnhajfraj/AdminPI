import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Joueur } from '../../model/joueur';

@Component({
  selector: 'app-modifier-joueur',
  templateUrl: './modifier-joueur.component.html',
  styleUrls: ['./modifier-joueur.component.scss']
})
export class ModifierJoueurComponent implements OnInit {
  joueurForm: FormGroup;
  idJoueur!: number;

  constructor(
    private fb: FormBuilder,
    private joueurService: JoueurEquipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.joueurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      tel: [null, [Validators.required, Validators.minLength(8)]],
      
      taille: [null, [Validators.required, Validators.min(0)]],
      poids: [null, [Validators.required, Validators.min(0)]],
      piedFort: ['', Validators.required],
      poste: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    this.idJoueur = +this.route.snapshot.paramMap.get('id')!;
    // Charge les données existantes
    this.joueurService.getJoueurById(this.idJoueur).subscribe({
      next: (joueur: Joueur) => {
        this.joueurForm.patchValue({
          
          nom: joueur.nom,
          prenom: joueur.prenom,
          mail: joueur.mail,
          tel: joueur.tel,
          taille: joueur.taille,
          poids: joueur.poids,
          piedFort: joueur.piedFort,
          poste: joueur.poste,
          description: joueur.description
        });
      },
      error: err => console.error('Erreur chargement joueur', err)
    });
  }

  onSubmit(): void {
    if (this.joueurForm.invalid) return;

    const updated: Joueur = {
      idJoueur: this.idJoueur,
     
      ...this.joueurForm.value
    };

    this.joueurService.modifierJoueur(this.idJoueur, updated).subscribe({
      next: () => {
        alert('✅ Joueur modifié avec succès !');
        this.router.navigate(['/afficher-joueur']);
      },
      error: err => {
        console.error('Erreur modification joueur', err);
        alert('❌ Impossible de modifier le joueur.');
      }
    });
  }

  annuler(): void {
    // Réinitialise le formulaire ou navigue ailleurs
    this.router.navigate(['/afficher-joueur']);
  }
}
