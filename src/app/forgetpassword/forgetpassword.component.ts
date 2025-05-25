import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
 emailForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService,
  private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
ngOnInit(): void {
  // Tu peux laisser vide si tu n'as rien à initialiser pour l'instant
}

onSubmit(): void {
  const email = this.emailForm.value.email;

  this.authService.forgotPassword(email).subscribe({
    next: (response) => {
      const tempPassword = response.tempPassword;  // Récupérer le mot de passe temporaire

      this.message = 'Email envoyé. Vérifiez votre boîte mail.';

      setTimeout(() => {
   this.router.navigate(['/reset-password'], {
  queryParams: { email, tempPassword }
});

      }, 2000);
    },
    error: (err) => {
      console.error(err);
      this.error = typeof err.error === 'string' ? err.error : err.error.message || 'Erreur lors de l’envoi.';
    }
  });
}


}