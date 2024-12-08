export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient'; // Add 'role' property
}
