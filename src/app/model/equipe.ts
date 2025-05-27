

export class Equipe {
  idEquipe!: number;
  nom!: string;
  logo!: string;
  adresse!: string;
  nb_joueur!: number;


  max_teams?: number;
  price?: number;
  
  // Relations
  users?: string[]; // Liste des utilisateurs associés à l'équipe
  matchsEquipe1?: string[]; // Liste des matchs où l'équipe est Equipe1
  tournois?: string[]; // Liste des tournois auxquels l'équipe participe
  joueurs?: string[]; // Liste des joueurs de l'équipe
}
