import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  selectedGender: string | null = null;

  constructor(private router: Router) {}

  selectGender(gender: string): void {
    this.selectedGender = gender;
  }

  goToNextStep(): void {
    if (this.selectedGender) {
      // Navigate to the next page (e.g., symptoms page)
      this.router.navigate(['/virtual-assistant/symptoms']);
    }
  }
}
