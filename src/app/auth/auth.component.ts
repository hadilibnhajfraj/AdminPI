import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  authForm: FormGroup;
  submitted = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    this.submitted = true;
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;
    this.authService.register({
      email, password,
      nom: '',
      prenom: '',
      dateNaissance: '',
      role: ''
    }).subscribe({
      next: () => (this.message = 'Inscription réussie'),
      error: (err) => (this.message = 'Erreur : ' + err.error),
    });
  }

  login(): void {
    this.submitted = true;
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.message = 'Connexion réussie';
      },
      error: (err) => (this.message = 'Erreur : ' + err.error),
    });
  }

  logout(): void {
    this.authService.logout();
    this.message = 'Déconnecté';
    this.authForm.reset();
    this.submitted = false;
  }
}
