import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  isMenuOpen = false;

  currentUser: IUser | null = null;
  isPacient = false;
  isDoctor = false;

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Close mobile menu on route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    // 1) Subscribe to user changes
    this.auth.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.isPacient = (user.role === 'PATIENT');
        this.isDoctor = (user.role === 'DOCTOR');
      } else {
        this.isPacient = false;
        this.isDoctor = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (width >= 768) {
      this.isMenuOpen = false; 
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openModal($event: Event) {
    $event.preventDefault();
    this.closeMenu();
    // show the "role" modal (patient or doctor)
    this.modal.toggleModal('role');
  }

  logout(): void {
    localStorage.removeItem('users');
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
