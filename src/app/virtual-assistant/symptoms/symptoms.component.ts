import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css'],
})
export class SymptomsComponent {
  selectedSymptoms: string[] = [];
  selectedSymptom: string | null = null;

  availableSymptoms: string[] = [
    'Headache',
    'Fever',
    'Fatigue',
    'Cough',
    'Nausea',
    'Dizziness',
    'Muscle Pain',
  ];

  constructor(private router: Router) {}

  // Add a symptom to the list
  addSymptom(): void {
    if (this.selectedSymptom && !this.selectedSymptoms.includes(this.selectedSymptom)) {
      this.selectedSymptoms.push(this.selectedSymptom);
    }
    this.selectedSymptom = null; // Reset selection
  }

  // Remove a symptom from the list
  removeSymptom(index: number): void {
    this.selectedSymptoms.splice(index, 1);
  }

  // Go back to the previous step (age selection)
  goBackToAge(): void {
    this.router.navigate(['/virtual-assistant/patient']);
  }

  // Proceed to the next step (regions)
  proceedToRegions(): void {
    if (this.selectedSymptoms.length > 0) {
      console.log('Selected Symptoms:', this.selectedSymptoms); // Debugging output
      this.router.navigate(['/virtual-assistant/regions']);
    }
  }
}
