import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PacientGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (user.role === 'pacient') {
      console.log('PacientGuard: Access granted for pacient.');
      return true;
    }
  
    console.log('PacientGuard: Access denied. Redirecting to home.');
    this.router.navigate(['/']);
    return false;
  }
  
}
