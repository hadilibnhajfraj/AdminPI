// publication.component.ts
import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  contenu: string = '';
  datePublication: string = '';
  isLive: boolean = false;
  file: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  createdPublication: any;
  publications: any[] = [];

  constructor(private publicationService: PublicationService, private router: Router) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  onFileSelected(event: any) {
  const selectedFile = event.target.files[0];

  if (selectedFile && selectedFile.size > 100 * 1024 * 1024) { // 100MB
    this.errorMessage = "Le fichier dépasse la taille maximale autorisée (100 Mo).";
    this.file = null;
  } else {
    this.errorMessage = '';
    this.file = selectedFile;
  }
}


addPublication() {
  if (!this.file) {
    this.errorMessage = "Veuillez sélectionner un fichier.";
    return;
  }

  if (this.file.size > 100 * 1024 * 1024) {
    this.errorMessage = "Le fichier dépasse la taille maximale autorisée (100 Mo).";
    return;
  }

  const publication = {
    contenu: this.contenu,
    datePublication: this.datePublication,
    typeMedia: this.file ? 'image' : 'video',
    isLive: this.isLive,
  };

  this.publicationService.addPublication(publication, this.file).subscribe({
    next: (createdPublication) => {
      this.successMessage = "Publication ajoutée avec succès!";
      this.createdPublication = createdPublication;
      this.resetForm();
      this.router.navigate(['/AllPub']);
    },
    error: (err) => {
      console.error("Erreur lors de l’ajout de la publication:", err);
      this.errorMessage = err?.error || "Erreur inconnue ou non autorisée.";
    }
  });
}



  delete(id: number) {
    if (!this.isPresse) return;
    this.publicationService.deletePublication(id).subscribe(() => {
      this.loadPublications();
    });
  }

  loadPublications() {
    this.publicationService.getMyPublications().subscribe(data => {
      this.publications = data;
    });
  }

  resetForm() {
    this.contenu = '';
    this.datePublication = '';
    this.isLive = false;
    this.file = null;
  }

  get isPresse(): boolean {
    return localStorage.getItem('role') === 'Presse';
  }
}
