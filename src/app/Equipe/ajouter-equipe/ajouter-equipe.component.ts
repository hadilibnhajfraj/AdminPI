import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurEquipeService } from '../../../services/joueur-equipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-equipe',
  templateUrl: './ajouter-equipe.component.html',
  styleUrls: ['./ajouter-equipe.component.scss']
})
export class AjouterEquipeComponent implements OnInit {
  equipeForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private equipeService: JoueurEquipeService,
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

  ngOnInit(): void {}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.equipeForm.valid) {
      const equipe = this.equipeForm.value;
      const logoFile = this.selectedFile;
  
      this.equipeService.ajouterEquipeAvecLogo(equipe, logoFile).subscribe({
        next: () => {
          alert('✅ Équipe ajoutée avec succès !');
          this.router.navigate(['/afficher-equipe']); // Redirection ici
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
        }
      });
    }
  }

  // // ✅ Méthode annulée placée proprement
  // annuler(): void {
  //   this.router.navigate(['ajouter-equipe']);
  // }

  annuler(): void {
    window.location.reload(); 
  }
  
}