import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: IUser | null = null;

  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = of(!!localStorage.getItem('token')).pipe(
      map((token) => !!token)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(map((auth) => auth));
  }

  /**
   * Simulates user registration by storing credentials in localStorage.
   * @param userData User's registration data.
   */
  public async createUser(userData: IUser): Promise<void> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    if (users.some((user: IUser) => user.email === userData.email)) {
      throw new Error('Email already exists!');
    }
  
    // Validate the presence of role
    if (!userData.role) {
      throw new Error('Role is required during registration!');
    }
  
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User registered:', userData);
  }  

  /**
   * Simulates login by validating credentials and storing a JWT token in localStorage.
   * @param email User's email.
   * @param password User's password.
   */
  public async login(email: string, password: string): Promise<void> {
    const users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email);
  
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
  
    // Simulate a JWT token
    const token = `mock-jwt-token-${btoa(email)}`;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Ensure this stores the correct user object
    this.currentUser = user;
    console.log('Logged in user stored in localStorage:', user);
  }
  

  /**
   * Logs out the user by clearing localStorage.
   * @param $event Optional click event.
   */
  public async logout($event?: Event): Promise<void> {
    if ($event) {
      $event.preventDefault();
    }

    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    console.log('Logged out');
  }
}
