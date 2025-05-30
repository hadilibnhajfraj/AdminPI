import { AfficherEquipeComponent } from '../Equipe/afficher-equipe/afficher-equipe.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export class Joueur {
  idJoueur!: number; 
  nom!: string;
  prenom!: string;
  mail!: string;
  tel!: number;      
  taille!: number;
  poids!: number;
  piedFort!: string;
  poste!: string;
  description!: string;

  // equipe?: AfficherEquipeComponent; 
  // user?: UserProfileComponent;   
  // joueurs: Joueur[];  

  equipe?: any; // ou AfficherEquipeComponent
  user?: any;

  // Ajout temporaire pour l'affectation
  selectedEquipeId?: number;
}




