import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: IUser | null = null; // Stores the logged-in user
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = of(!!localStorage.getItem('token')).pipe(
      map((token) => !!token)
    );

    // Simulate a delay for authentication check
    this.isAuthenticatedWithDelay$ = timer(500).pipe(
      switchMap(() => this.isAuthenticated$) // Simulate a delay of 500ms
    );
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

    // Ensure role is provided
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
    localStorage.setItem('user', JSON.stringify(user)); // Save the user object
    this.currentUser = user;

    console.log('Logged in user:', user);
  }

  /**
   * Determines if the logged-in user is a doctor.
   */
  isDoctor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'doctor';
  }

  /**
   * Determines if the logged-in user is a patient.
   */
  isPatient(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'patient';
  }

  /**
   * Gets the current user from localStorage.
   */
  private getCurrentUser(): IUser | null {
    if (!this.currentUser) {
      const user = localStorage.getItem('user');
      this.currentUser = user ? JSON.parse(user) : null;
    }
    return this.currentUser;
  }

  /**
   * Logs out the user by clearing localStorage.
   */
  public async logout($event?: Event): Promise<void> {
    if ($event) {
      $event.preventDefault();
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = null;

    console.log('Logged out');
  }
}
