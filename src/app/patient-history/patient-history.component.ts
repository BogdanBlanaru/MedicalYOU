import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css'],
})
export class PatientHistoryComponent implements OnInit {
  history: any[] = []; // Istoric pacient

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    // Obține istoricul pacientului
    this.patientService.getPatientHistory().subscribe((data) => {
      this.history = data;
    });
  }
}
