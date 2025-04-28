import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    if (username === 'meriem.bsm.fb@gmail.com' && password === 'admin') {
      this.router.navigate(['/inscription']);
    } else {
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  }
}
