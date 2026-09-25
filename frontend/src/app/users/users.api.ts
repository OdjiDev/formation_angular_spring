import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/users';

  async lister(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.baseUrl));
  }

  async creer(user: Omit<User, 'id'>): Promise<User> {
    return firstValueFrom(this.http.post<User>(this.baseUrl, user));
  }

  async supprimer(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }

  async modifier(id: number, user: Partial<User>): Promise<User> {
    return firstValueFrom(this.http.patch<User>(`${this.baseUrl}/${id}`, user));
  }
}
