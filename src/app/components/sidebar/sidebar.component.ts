import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
  { path: '/inscription', title: 'Inscription',  icon:'education_atom', class: '' },
    { path: '/icons', title: 'Creation Tournoi',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Tous les tournois',  icon:'location_map-big', class: '' },
  { path: '/afficher-equipe', title: 'Les equipes',  icon:'design_bullet-list-67', class: '' },
  { path: '/afficher-joueur', title: 'Les joueurs',  icon:'users_single-02', class: '' },
  { path: '/Drag-joueur', title: 'Drag Drop Joueur',  icon:'education_atom', class: '' } ,   
{ path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/terrain', title: 'Terrain',  icon:'ui-1_bell-53', class: '' },
    { path: '/match', title: 'Match',  icon:'ui-1_bell-53', class: '' },
    { path: '/disponibilite', title: 'Disponibilite',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' },
    { path: '/video', title: 'Video',  icon:'text_caps-small', class: '' },
    { path: '/login', title: 'Login',  icon:'text_caps-small', class: '' }

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
