import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
 
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },

  { path: '/login', title: 'Se Connecter',  icon:'users_single-02', class: '' },
  { path: '/inscription', title: 'Inscription',  icon:'education_atom', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  { path: '/afficher-equipe', title: 'Les equipes',  icon:'design_bullet-list-67', class: '' },
  { path: '/afficher-joueur', title: 'Les joueurs',  icon:'users_single-02', class: '' },
  { path: '/Drag-joueur', title: 'Drag Drop Joueur',  icon:'education_atom', class: '' },
  // { path: '/evenementMeriem', title: 'Les Evennements',  icon:'objects_spaceship', class: 'active active-pro' },
  // { path: '/matches', title: 'Les Matches',  icon:'design_bullet-list-67', class: '' }

  // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
