import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'oauth2-redirect',
  templateUrl: './oauth2-redirect.component.html',
  styleUrls: ['./oauth2-redirect.component.scss']
})
export class Oauth2RedirectComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Exemple : tu peux récupérer un token via le backend si besoin
    // Puis rediriger où tu veux
    this.router.navigate(['/user']);
  }

}
