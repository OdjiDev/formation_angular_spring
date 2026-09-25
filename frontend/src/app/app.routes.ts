import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { UsersPage } from './users/pages/users-page/users-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Accueil' },
  { path: 'users', component: UsersPage, title: 'Utilisateurs' },
  { path: '**', redirectTo: '' }
];
