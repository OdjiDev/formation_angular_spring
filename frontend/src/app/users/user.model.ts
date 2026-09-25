export interface User {
  id: number;
  nom: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  actif: boolean;
}
