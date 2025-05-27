import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService'; // adapte le chemin si besoin
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token); // Sauvegarde du token
        this.router.navigate(['/user']);  // Redirection après connexion
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Échec de la connexion.";
      }
    });
  }
  goToRegister() {
  // Par exemple, rediriger vers une page d'inscription
  this.router.navigate(['/register']);
}
goToForgotPassword() {
  this.router.navigate(['/forgot-password']);
}
signInWithGoogle() {
  window.location.href = 'http://localhost:8082/oauth2/authorization/google?prompt=select_account';
}


signInWithFacebook() {
  window.location.href = 'http://localhost:8082/oauth2/authorization/facebook';
}

}
