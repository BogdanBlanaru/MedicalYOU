import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SymptomsService } from 'src/app/services/symptoms.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css'],
})
export class SymptomsComponent {
  selectedSymptoms: string[] = [];
  availableSymptoms: string[] = [];
  filteredSymptoms: string[] = [];
  searchTerm: string = '';
  dropdownOpen: boolean = false;

  constructor(private router: Router, private symptomsService: SymptomsService) {}

  ngOnInit(): void {
    this.symptomsService.getSymptoms().subscribe((symptoms) => {
      this.availableSymptoms = symptoms;
      this.filteredSymptoms = symptoms; // Initially show all symptoms
    });
  }

  // Open the dropdown
  openDropdown(): void {
    this.filteredSymptoms = this.availableSymptoms; // Reset filter
    this.dropdownOpen = true;
  }

  // Filter the symptoms based on the search term
  filterSymptoms(): void {
    this.filteredSymptoms = this.availableSymptoms.filter((symptom) =>
      symptom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.dropdownOpen = true; // Open dropdown when filtering
  }

  // Add a symptom from the search dropdown
  selectSymptomFromSearch(symptom: string): void {
    if (!this.selectedSymptoms.includes(symptom)) {
      this.selectedSymptoms.push(symptom);
    }
    this.searchTerm = ''; // Clear the search term
    this.dropdownOpen = false; // Close the dropdown
  }

  // Remove a symptom from the selected list
  removeSymptom(index: number): void {
    this.selectedSymptoms.splice(index, 1);
  }

  // Close the dropdown when clicking outside
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  // Navigate back to the previous step
  goBackToAge(): void {
    this.router.navigate(['/virtual-assistant/patient']);
  }

  // Proceed to the next step
  proceedToRegions(): void {
    if (this.selectedSymptoms.length > 0) {
      console.log('Selected Symptoms:', this.selectedSymptoms); // Debugging output
      this.router.navigate(['/virtual-assistant/regions']);
    }
  }

  // Detect clicks outside the dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeDropdown();
    }
  }
}
