import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  // Événement émis quand le formulaire est validé
  ajouter = output<Omit<User, 'id'>>();

  // État du formulaire
  protected readonly nom = signal('');
  protected readonly email = signal('');
  protected readonly role = signal<User['role']>('user');
  protected readonly actif = signal(true);

  // État de soumission
  protected readonly envoye = signal(false);

  // Validation
  protected readonly nomValide = () => this.nom().trim().length >= 2;
  protected readonly emailValide = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email());
  protected readonly formulaireValide = () => this.nomValide() && this.emailValide();

  onSubmit() {
    this.envoye.set(true);

    if (!this.formulaireValide()) {
      return;
    }

    this.ajouter.emit({
      nom: this.nom().trim(),
      email: this.email().trim(),
      role: this.role(),
      actif: this.actif()
    });

    this.reset();
  }

  reset() {
    this.nom.set('');
    this.email.set('');
    this.role.set('user');
    this.actif.set(true);
    this.envoye.set(false);
  }
}
