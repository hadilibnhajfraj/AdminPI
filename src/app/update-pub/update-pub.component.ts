import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'update-pub',
  templateUrl: './update-pub.component.html',
  styleUrls: ['./update-pub.component.css']
})
export class UpdatePubComponent implements OnInit {
  public id: string;
  public contenu: string;
  public datePublication: string;
  public isLive: boolean;
  public successMessage: string;
  public errorMessage: string;
  public file: File | null = null;
  public publication: any; // Pour stocker la publication récupérée

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la publication depuis l'URL
    this.id = this.route.snapshot.paramMap.get('id') || '';

    // Appel à la méthode du service pour récupérer la publication
    this.getPublicationById(this.id);
  }

  getPublicationById(id: string): void {
    this.publicationService.getPublicationById(id).subscribe(
      (response) => {
        // Assurez-vous que la réponse contient la publication avec tous ses champs
        this.publication = response;
        this.contenu = this.publication.contenu;
        this.datePublication = this.publication.datePublication;
        this.isLive = this.publication.isLive;
       this.file=this.publication.isLive;
      },
      (error) => {
        console.error('Erreur lors du chargement de la publication:', error);
        this.errorMessage = 'Erreur lors du chargement de la publication';
      }
    );
  }

  // Méthode de mise à jour
  updatePublication(): void {
    const publication = {
      contenu: this.contenu,
      datePublication: this.datePublication,
      isLive: this.isLive
    };

    this.publicationService.updatePublication(this.id, publication, this.file).subscribe(
      (response) => {
        this.successMessage = 'Publication mise à jour avec succès';
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la publication:', error);
        this.errorMessage = 'Erreur lors de la mise à jour de la publication';
      }
    );
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
}
