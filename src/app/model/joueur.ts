import { AfficherEquipeComponent } from '../Equipe/afficher-equipe/afficher-equipe.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


export class Joueur {
  idJoueur!: number;
  taille!: number;
  poids!: number;
  piedFort!: string;
  poste!: string;
  description!: string;

  equipe?: AfficherEquipeComponent; // Relation ManyToOne vers Equipe
  user?: UserProfileComponent;     // Relation ManyToOne vers User
}
