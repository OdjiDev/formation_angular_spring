import { Component, inject, signal, OnInit } from '@angular/core';
import { UserCard } from '../../user-card/user-card';
import { UserForm } from '../../user-form/user-form';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-users-page',
  imports: [UserCard, UserForm],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css'
})
export class UsersPage implements OnInit {
  protected readonly title = signal('Gestion des utilisateurs');

  private readonly userService = inject(UserService);

  protected readonly users = this.userService.users;
  protected readonly chargement = this.userService.chargement;
  protected readonly erreur = this.userService.erreur;

  ngOnInit() {
    this.userService.charger();
  }

  async ajouterUser(user: Omit<User, 'id'>) {
    await this.userService.ajouter(user);
  }

  async supprimerUser(id: number) {
    await this.userService.supprimer(id);
  }
}
