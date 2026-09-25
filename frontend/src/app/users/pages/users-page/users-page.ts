import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../../user-card/user-card';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users-page',
  imports: [UserCard],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css'
})
export class UsersPage {
  protected readonly title = signal('Gestion des utilisateurs');

  private readonly userService = inject(UserService);

  protected readonly users = this.userService.users;

  supprimerUser(id: number) {
    this.userService.supprimer(id);
  }

  ajouterUserTest() {
    this.userService.ajouter({
      nom: 'Nouvel Utilisateur',
      email: 'nouveau@exemple.com',
      role: 'user',
      actif: true
    });
  }
}
