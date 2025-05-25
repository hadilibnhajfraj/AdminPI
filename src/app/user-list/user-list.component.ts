import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
 

  constructor(private userService: UserService,    private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur de chargement des utilisateurs', err)
    });
  }
  ajouterUtilisateur() {
  // Redirection vers une page ou formulaire pour créer un utilisateur
  console.log("Ajout d'un utilisateur");
 this.router.navigate(['/add']);
}

modifierUtilisateur(user: User) {
  // Redirection vers un formulaire de modification avec les données de l'utilisateur
  console.log("Modification de l'utilisateur", user);
this.router.navigate([`/updateUser/${user.id}`]);
}

supprimerUtilisateur(userId: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId);
        console.log('Utilisateur supprimé');
      },
      error: err => console.error('Erreur lors de la suppression', err)
    });
  }
}
logout(): void {
  this.authService.logout(); // nettoyage du token, etc.
  this.router.navigate(['/login']); // redirection vers la page login
}
}
