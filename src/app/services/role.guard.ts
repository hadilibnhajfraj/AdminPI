import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;

    const expectedRole = route.data['expectedRole'];

    if (userRole === expectedRole) {
      return true;
    } else {
      // Rediriger selon le rôle de l'utilisateur
      if (userRole === 'Presse') {
        this.router.navigate(['/video']);
      } else if (userRole === 'Spectateur') {
        this.router.navigate(['/spectateur']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
