import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Equipe } from '../../model/equipe';

@Component({
  selector: 'app-modifier-equipe',
  templateUrl: './modifier-equipe.component.html',
  styleUrls: ['./modifier-equipe.component.scss']
})
export class ModifierEquipeComponent implements OnInit {
  equipeForm: FormGroup;
  selectedFile: File | null = null;
  idEquipe!: number;

  constructor(
    private fb: FormBuilder,
    private equipeService: JoueurEquipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.equipeForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      nb_joueur: [1, [Validators.required, Validators.min(1)]],
      max_teams: [8],
      price: ['1199'],
      logo: [null]
    });
  }

  ngOnInit(): void {
    this.idEquipe = +this.route.snapshot.paramMap.get('id')!;
    this.equipeService.getEquipeById(this.idEquipe).subscribe((equipe: Equipe) => {
      this.equipeForm.patchValue({
        nom: equipe.nom,
        adresse: equipe.adresse,
        nb_joueur: equipe.nb_joueur,
        max_teams: equipe.max_teams ?? 8,
        price: equipe.price ?? '1199'
      });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.equipeForm.invalid) {
      return;
    }
  
    const formData = new FormData();
  
    // Sérialiser l'objet 'equipe' en JSON et l'ajouter à formData
    const equipeData = {
      nom: this.equipeForm.value.nom,
      adresse: this.equipeForm.value.adresse,
      nb_joueur: this.equipeForm.value.nb_joueur,
      max_teams: this.equipeForm.value.max_teams,
      price: this.equipeForm.value.price
    };
  
    formData.append('equipe', new Blob([JSON.stringify(equipeData)], { type: 'application/json' }));
  
    // Ajouter le fichier logo s'il est sélectionné
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }
  
    this.equipeService.modifierEquipe(this.idEquipe, formData).subscribe({
      next: () => {
        alert('✅ Équipe modifiée avec succès !');
        this.router.navigate(['/afficher-equipe']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la modification :', err);
        alert("Une erreur est survenue !");
      }
    });
  }
  

  annuler(): void {
    this.router.navigate(['/afficher-equipe']);
  }
}
