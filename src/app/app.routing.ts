import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { MapsComponent } from './maps/maps.component';
import { MatchtournoiComponent } from './matchtournoi/matchtournoi.component';
import { EquipetournoiComponent } from './equipetournoi/equipetournoi.component';
import { DispoTerrainComponent } from './dispo-terrain/dispo-terrain.component';
import { MatchChampionnatComponent } from './match-championnat/match-championnat.component';


const routes: Routes =[
 
  { path: 'tournoi/:id', component: TournoiComponent }, // Route pour afficher le tournoi 
  //{ path: '**', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'tournoi/:id/matchs', component: MatchtournoiComponent },
  { path: 'tournoi/:idTournoi/equipes', component: EquipetournoiComponent },
  { path: 'dispo-terrain/:id', component: DispoTerrainComponent },
  { path: 'tournoi/:id/championnat', component: MatchChampionnatComponent },


  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  { path: 'maps', component: MapsComponent }
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
