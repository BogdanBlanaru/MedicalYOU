import { Component, OnInit } from '@angular/core';
import { PatientHistory } from '../models/patient-history.model';


@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css'],
})
export class PatientHistoryComponent implements OnInit {
  history: PatientHistory[] = []; // Use the PatientHistory model for type safety

  ngOnInit(): void {
    // Hardcoded patient history data
    this.history = [
      {
        patientId: '123',
        age: 35,
        gender: 'Male',
        address: '123 Main Street, Springfield',
        weight: 70,
        height: 175,
        chatLogId: 'chat-001',
        symptoms: ['Fever', 'Cough', 'Headache'],
        results: 'Diagnosed with flu and prescribed medication.',
        date: new Date('2023-12-01'),
        doctorName: 'Dr. John Doe',
      },
      {
        patientId: '124',
        age: 29,
        gender: 'Female',
        address: '456 Elm Street, Metropolis',
        weight: 60,
        height: 165,
        chatLogId: 'chat-002',
        symptoms: ['Fatigue', 'Shortness of breath'],
        results: 'Referred for further diagnostic tests.',
        date: new Date('2023-11-15'),
        doctorName: 'Dr. Jane Smith',
      },
      {
        patientId: '125',
        age: 40,
        gender: 'Male',
        address: '789 Oak Street, Gotham',
        weight: 85,
        height: 180,
        chatLogId: 'chat-003',
        symptoms: ['Chest pain', 'Dizziness'],
        results: 'Diagnosed with mild hypertension and advised lifestyle changes.',
        date: new Date('2023-10-20'),
        doctorName: 'Dr. Alice Brown',
      },
    ];
  }
}
