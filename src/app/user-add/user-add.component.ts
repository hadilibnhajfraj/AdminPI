import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    dateNaissance: null,
    role: 'Spectateur'
  };

  constructor(private userService: UserService, private router: Router) {}
 ngOnInit(): void {}

  onSubmit(): void {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès');
        this.router.navigate(['/user']);
      },
      error: err => {
        console.error('Erreur lors de l\'ajout', err);
        alert('Erreur lors de l\'ajout de l\'utilisateur');
      }
    });
  }
}
