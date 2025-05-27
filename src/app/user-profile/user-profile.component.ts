import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    dateNaissance: null,
    role: 'USER'
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe(() => {
      alert('Utilisateur mis à jour avec succès');
      this.router.navigate(['/user']);
    });
  }
}