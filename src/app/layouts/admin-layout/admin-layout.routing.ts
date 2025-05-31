import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../Joueur/notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from "../..//login/login.component";
import { PublicationComponent } from "../../publication/publication.component";
import { UserPubComponent } from "../../user-pub/user-pub.component";
import { UpdatePubComponent } from "../../update-pub/update-pub.component";
import { SpectateurComponent } from "../../spectateur/spectateur.component";
import { RoleGuard } from "../../services/role.guard";
import { AllspectateurComponent } from "../../allspectateur/allspectateur.component";
import { UserListComponent } from '../../user-list/user-list.component';
//Joueur
import { AjouterJoueurComponent } from '../../Joueur/ajouter-joueur/ajouter-joueur.component';
import { AfficherJoueurComponent } from '../../Joueur/afficher-joueur/afficher-joueur.component';
import { ModifierJoueurComponent } from '../../Joueur/modifier-joueur/modifier-joueur.component';
import { SupprimerJoueurComponent } from '../../Joueur/supprimer-joueur/supprimer-joueur.component';
import { AffecterJoueurComponent } from '../../Joueur/affecter-joueur/affecter-joueur.component';
import { RetirerJoueurComponent } from '../../Joueur/retirer-joueur/retirer-joueur.component';
//Equipe
import { AjouterEquipeComponent } from '../../Equipe/ajouter-equipe/ajouter-equipe.component';
import { AfficherEquipeComponent } from '../../Equipe/afficher-equipe/afficher-equipe.component';
import { ModifierEquipeComponent } from '../../Equipe/modifier-equipe/modifier-equipe.component';
import { SupprimerEquipeComponent } from '../../Equipe/supprimer-equipe/supprimer-equipe.component';
//inscription
import { LoginComponent } from '../../login/login.component';
import { InscriptionComponent } from '../../inscription/inscription.component';
import { CreeCompteComponent } from '../../cree-compte/cree-compte.component';
import { DragDropJoueurComponent } from '../../Joueur/drag-drop-joueur/drag-drop-joueur.component';
import { TerrainComponent } from '../../terrain/terrain.component';
import { MatchComponent } from '../../match/match.component';
import { DisponibiliteTerrainComponent } from '../../disponibilite-terrain/disponibilite-terrain.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
    { path: 'terrain',   component: TerrainComponent },
    { path: 'match',        component: MatchComponent },
    { path: 'disponibilite',  component: DisponibiliteTerrainComponent },
  //Joueur
  { path: 'ajouter-joueur', component: AjouterJoueurComponent },
  { path: 'afficher-joueur', component: AfficherJoueurComponent },
  { path: 'modifier-joueur/:id', component: ModifierJoueurComponent },
  { path: 'supprimer-joueur/:id', component: SupprimerJoueurComponent },
  { path: 'affecter-joueur', component: AffecterJoueurComponent },
  { path: 'retirer-joueur', component: RetirerJoueurComponent },

//API Drag-drop joueur
{ path: 'Drag-joueur', component: DragDropJoueurComponent },

  //Equipe
  { path: 'ajouter-equipe', component: AjouterEquipeComponent },
  { path: 'afficher-equipe', component: AfficherEquipeComponent },
    { path: 'modifier-equipe/:id', component: ModifierEquipeComponent },
  { path: 'supprimer-equipe/:id', component: SupprimerEquipeComponent },
  //inscription
  { path: 'login', component: LoginComponent },
  { path: 'cree-compte', component: CreeCompteComponent },
  { path: 'inscription', component: InscriptionComponent }
  { path: "login", component: LoginComponent },
  { path: "updatePub/:id", component: UpdatePubComponent },
  { path: "addpublication", component: PublicationComponent },
{
    path: "video",
    component: VideoStreamComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Presse" },
  },
  {
   path: "AllPub", component: UserPubComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Presse" },
  },
  {
    path: "spectateur",
    component: SpectateurComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Spectateur" },
  },
  {
    path: "publication",
    component: AllspectateurComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: "Spectateur" },
  },
];
