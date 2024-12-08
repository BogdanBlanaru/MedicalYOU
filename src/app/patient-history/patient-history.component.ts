import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css'],
})
export class PatientHistoryComponent implements OnInit {
  patientHistory = [
    {
      doctorName: 'Dr. John Doe',
      symptoms: ['Fever', 'Cough', 'Headache'],
      results: 'Diagnosed with flu and prescribed medication.',
      date: new Date('2023-12-01'),
    },
    {
      doctorName: 'Dr. John Doe',
      symptoms: ['Fatigue', 'Cough', 'Headache'],
      results: 'Prescribed rest and hydration.',
      date: new Date('2023-11-15'),
    },
    {
      doctorName: 'Dr. John Doe',
      symptoms: ['Chest pain', 'Dizziness', 'Headache'],
      results: 'Referred for further diagnostic tests.',
      date: new Date('2023-10-20'),
    },
    {
      doctorName: 'Dr. John Doe',
      symptoms: ['Chest pain', 'Dizziness'],
      results: 'Referred for further diagnostic tests.',
      date: new Date('2023-10-20'),
    },
  ];

  symptomsChartData: any[] = [];
  view: [number, number] = [700, 400];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'], // Define custom colors
  };

  ngOnInit(): void {
    this.symptomsChartData = this.prepareSymptomsChartData();
  }

  private prepareSymptomsChartData(): any[] {
    const symptomCounts: { [key: string]: number } = {};

    this.patientHistory.forEach((record) => {
      record.symptoms.forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    return Object.entries(symptomCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }
}
