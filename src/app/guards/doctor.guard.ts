import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService

@Injectable({
  providedIn: 'root',
})
export class DoctorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isDoctor()) {
      return true; // Allow access
    }
    this.router.navigate(['/']); // Redirect to home if not a doctor
    return false;
  }
}
