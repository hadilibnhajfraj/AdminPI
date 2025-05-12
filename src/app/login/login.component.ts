import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);

          // Décoder le token pour obtenir le rôle de l'utilisateur
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          const userRole = payload.role;

          // Redirection en fonction du rôle
          if (userRole === 'Presse') {
            this.router.navigate(['/AllPub']);
          } else if (userRole === 'Spectateur') {
            this.router.navigate(['/publication']);
          } else {
            // Si le rôle n'est pas reconnu, rediriger vers la page par défaut ou login
            this.router.navigate(['/login']);
          }
        },
        error: () => this.errorMessage = 'Login failed. Please check your credentials.'
      });
  }
}
