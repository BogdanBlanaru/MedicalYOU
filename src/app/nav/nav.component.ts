import { Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMenuOpen = false;
  isPacient: boolean = false;

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'pacient') {
      this.isPacient = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (width >= 768) {
      this.isMenuOpen = false; // Automatically close the mobile menu for desktop
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

    this.modal.toggleModal('auth');
  }

  logout(): void {
    localStorage.removeItem('users'); // Clear user data
    this.auth.logout();
    this.router.navigate(['/']); // Redirect to login
  }
}
