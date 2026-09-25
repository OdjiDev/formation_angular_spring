import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../../user-card/user-card';
import { UserService } from '../../user.service';
import { UserForm } from '../../user-form/user-form';
import { User } from '../../user.model';

@Component({
  selector: 'app-users-page',
  imports: [UserCard, UserForm],
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

  ajouterUser(user: Omit<User, 'id'>) {
    this.userService.ajouter(user);
  }
}
