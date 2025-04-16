import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
//Joueur
import { AjouterJoueurComponent } from '../../Joueur/ajouter-joueur/ajouter-joueur.component';
import { AfficherJoueurComponent } from '../../Joueur/afficher-joueur/afficher-joueur.component';
//Equipe
import { AjouterEquipeComponent } from '../../Equipe/ajouter-equipe/ajouter-equipe.component';
import { AfficherEquipeComponent } from '../../Equipe/afficher-equipe/afficher-equipe.component';
//inscription
import { LoginComponent } from '../../login/login.component';
import { InscriptionComponent } from '../../inscription/inscription.component';
import { CreeCompteComponent } from '../../cree-compte/cree-compte.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },

  //Joueur
  { path: 'ajouter-joueur', component: AjouterJoueurComponent },
  { path: 'afficher-joueur', component: AfficherJoueurComponent },
  //Equipe
  { path: 'ajouter-equipe', component: AjouterEquipeComponent },
  { path: 'afficher-equipe', component: AfficherEquipeComponent },
  //inscription
  { path: 'login', component: LoginComponent },
  { path: 'cree-compte', component: CreeCompteComponent },
  { path: 'inscription', component: InscriptionComponent }


];
