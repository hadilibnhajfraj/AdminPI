import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-joueur',
  templateUrl: './ajouter-joueur.component.html',
  styleUrls: ['./ajouter-joueur.component.scss']
})
export class AjouterJoueurComponent implements OnInit {
  joueurForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private joueurEquipeService: JoueurEquipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.joueurForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      poste: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_naissance: ['', Validators.required],
      taille: [null, [Validators.required, Validators.min(100)]],
      poids: [null, [Validators.required, Validators.min(30)]],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      code_postal: [null, [Validators.required, Validators.minLength(4)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.joueurForm.valid) {
      const joueur = this.joueurForm.value;
      this.joueurEquipeService.ajouterNouveauJoueur(joueur).subscribe({
        next: () => {
          alert('✅ Joueur ajouté avec succès !');
          this.router.navigate(['/afficher-joueur']); 
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du joueur :', err);
          alert('❌ Une erreur est survenue lors de l\'ajout du joueur.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  annuler(): void {
    this.joueurForm.reset();
  }
}
