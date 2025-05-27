import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../Joueur/notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

//Equipe
import { AjouterEquipeComponent } from '../../Equipe/ajouter-equipe/ajouter-equipe.component';
import { ModifierEquipeComponent } from '../../Equipe/modifier-equipe/modifier-equipe.component';
import { AfficherEquipeComponent } from '../../Equipe/afficher-equipe/afficher-equipe.component';
import { SupprimerEquipeComponent } from '../../Equipe/supprimer-equipe/supprimer-equipe.component';

//Joueur
import { AjouterJoueurComponent } from '../../Joueur/ajouter-joueur/ajouter-joueur.component';
import { SupprimerJoueurComponent } from '../../Joueur/supprimer-joueur/supprimer-joueur.component';
import { AfficherJoueurComponent } from '../../Joueur/afficher-joueur/afficher-joueur.component';
import { ModifierJoueurComponent } from '../../Joueur/modifier-joueur/modifier-joueur.component';
import { RetirerJoueurComponent } from '../../Joueur/retirer-joueur/retirer-joueur.component';
import { AffecterJoueurComponent } from '../../Joueur/affecter-joueur/affecter-joueur.component';

//Inscription
import { LoginComponent } from '../../login/login.component';
import { InscriptionComponent } from '../../inscription/inscription.component';
import { CreeCompteComponent } from '../../cree-compte/cree-compte.component';

//Affectation JE drag and drop
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropJoueurComponent } from '../../Joueur/drag-drop-joueur/drag-drop-joueur.component';



@NgModule({
  imports: [
    DragDropModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
     //
     ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
//Equipe
    AjouterEquipeComponent,
    ModifierEquipeComponent,
    AfficherEquipeComponent,
    SupprimerEquipeComponent,
//joueur
    SupprimerJoueurComponent,
    AfficherJoueurComponent,
    ModifierJoueurComponent,
    AjouterJoueurComponent,
    RetirerJoueurComponent,  
    AffecterJoueurComponent,  
    DragDropJoueurComponent,
//Inscription
LoginComponent,
InscriptionComponent,
CreeCompteComponent
  ]
})

export class AdminLayoutModule {}
