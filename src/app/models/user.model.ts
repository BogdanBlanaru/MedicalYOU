export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'pacient' | 'doctor'; // Role selection
}