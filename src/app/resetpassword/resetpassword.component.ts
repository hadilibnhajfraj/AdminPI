import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
  private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      tempPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const tempPassword = this.route.snapshot.queryParamMap.get('tempPassword');

    if (email) {
      this.resetForm.patchValue({ email });
    }

    if (tempPassword) {
      this.resetForm.patchValue({ tempPassword });
      this.message = `Voici votre mot de passe temporaire : ${tempPassword}`;
    }

    console.log('Paramètres initiaux reçus :', email, tempPassword);
  }

  onSubmit(): void {
    const formData = this.resetForm.value;

    if (formData.newPassword !== formData.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

  this.authService.resetPassword({
  email: formData.email,
  tempPassword: formData.tempPassword,
  newPassword: formData.newPassword
}).subscribe({
 next: (response) => {
 const message = (response as { message?: string }).message || 'Mot de passe modifié avec succès.';
  window.alert(message); // Affiche une popup

  this.error = '';
  this.message = message;

  // Redirection vers la page de connexion
  this.router.navigate(['/login']);
},

  error: (err) => {
    console.error(err);
    this.error = typeof err.error === 'string'
      ? err.error
      : err.error.message || 'Erreur lors de la réinitialisation.';
  }
});

  }
}
