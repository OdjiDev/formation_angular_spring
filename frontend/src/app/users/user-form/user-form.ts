import { Component, output, signal } from '@angular/core';
import { form, FormField, required, email, minLength, submit } from '@angular/forms/signals';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  imports: [FormField],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  ajouter = output<Omit<User, 'id'>>();

  protected readonly userModel = signal({
    nom: '',
    email: '',
    role: 'user' as User['role'],
    actif: true
  });

  protected readonly userForm = form(this.userModel, (path) => {
    required(path.nom, { message: 'Le nom est requis' });
    minLength(path.nom, 2, { message: 'Au moins 2 caractères' });
    required(path.email, { message: 'L\'email est requis' });
    email(path.email, { message: 'Email invalide' });
  });

 async sauvegarder() {
  console.log('sauvegarder appelé');
  await submit(this.userForm, async (form) => {
    console.log('submit callback exécuté');
    const valeurs = form().value();
    console.log('valeurs:', valeurs);
    this.ajouter.emit({
      nom: valeurs.nom.trim(),
      email: valeurs.email.trim(),
      role: valeurs.role,
      actif: valeurs.actif
    });
    this.reset();
  });
}

  reset() {
    this.userModel.set({ nom: '', email: '', role: 'user', actif: true });
  }
}
