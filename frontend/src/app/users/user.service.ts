import { Injectable, inject, signal } from '@angular/core';
import { UsersApi } from './users.api';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api = inject(UsersApi);

  private readonly _users = signal<User[]>([]);
  private readonly _chargement = signal(false);
  private readonly _erreur = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly chargement = this._chargement.asReadonly();
  readonly erreur = this._erreur.asReadonly();

  async charger() {
    this._chargement.set(true);
    this._erreur.set(null);
    try {
      const liste = await this.api.lister();
      this._users.set(liste);
    } catch (e) {
      this._erreur.set('Impossible de charger les utilisateurs.');
    } finally {
      this._chargement.set(false);
    }
  }

  async ajouter(user: Omit<User, 'id'>) {
    const cree = await this.api.creer(user);
    this._users.update(liste => [...liste, cree]);
  }

  async supprimer(id: number) {
    await this.api.supprimer(id);
    this._users.update(liste => liste.filter(u => u.id !== id));
  }
}""
