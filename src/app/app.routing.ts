import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserListComponent } from './user-list/user-list.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { MapsComponent } from './maps/maps.component';
import { MatchtournoiComponent } from './matchtournoi/matchtournoi.component';
import { EquipetournoiComponent } from './equipetournoi/equipetournoi.component';
import { DispoTerrainComponent } from './dispo-terrain/dispo-terrain.component';
import { MatchChampionnatComponent } from './match-championnat/match-championnat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddComponent } from './user-add/user-add.component';
import { Oauth2RedirectComponent } from './oauth2-redirect/oauth2-redirect.component';

const routes: Routes = [
 
  { path: 'tournoi/:id', component: TournoiComponent }, // Route pour afficher le tournoi 
  //{ path: '**', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'tournoi/:id/matchs', component: MatchtournoiComponent },
  { path: 'tournoi/:idTournoi/equipes', component: EquipetournoiComponent },
  { path: 'dispo-terrain/:id', component: DispoTerrainComponent },
  { path: 'tournoi/:id/championnat', component: MatchChampionnatComponent },
 path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }]},
 /* {
    path: '',
    component: AdminLayoutComponent,
  
  },*/
  {
    path: 'login',
    component: LoginComponent
  },
    {
    path: 'register',
    component: RegisterComponent
  },
      {
    path: 'forgot-password',
    component: ForgetpasswordComponent
  },
    {
    path: 'reset-password',
    component: ResetpasswordComponent
  }, {
    path: 'user',
    component: UserListComponent
  }, {
   path: 'updateUser/:id',
    component: UserProfileComponent
  },
   {
    path: '',
    component: DashboardComponent
  }, {
   path: 'add',
    component: UserAddComponent
  },
  // app-routing.module.ts
{ path: 'oauth2-redirect', component: Oauth2RedirectComponent }

  /* {
    path: '**',
    redirectTo: 'dashboard'
  } */
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
