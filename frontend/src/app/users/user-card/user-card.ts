import { Component, input, output } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  user = input.required<User>();
  supprimer = output<number>();

  onSupprimer() {
    this.supprimer.emit(this.user().id);
  }
}
