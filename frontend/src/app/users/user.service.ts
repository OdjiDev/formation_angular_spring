import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _users = signal<User[]>([
    { id: 1, nom: 'Alice Dupont', email: 'alice@exemple.com', role: 'admin', actif: true },
    { id: 2, nom: 'Bob Martin', email: 'bob@exemple.com', role: 'user', actif: true },
    { id: 3, nom: 'Claire Petit', email: 'claire@exemple.com', role: 'guest', actif: false },
  ]);

  readonly users = this._users.asReadonly();

  supprimer(id: number) {
    this._users.update(liste => liste.filter(u => u.id !== id));
  }

  ajouter(user: Omit<User, 'id'>) {
    const nouvelId = Math.max(0, ...this._users().map(u => u.id)) + 1;
    this._users.update(liste => [...liste, { ...user, id: nouvelId }]);
  }
}
