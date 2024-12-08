import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from 'src/app/services/prediction.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  predictionResult: any = {}; // This will hold the API response

  constructor(private router: Router, private predictionService: PredictionService) {}

  ngOnInit(): void {
    // Fetch the prediction results (mock API call here)
    this.predictionService.getPredictionResults().subscribe((response) => {
      this.predictionResult = response;
    });
  }

  retryInterview(): void {
    this.router.navigate(['/virtual-assistant']); // Navigate to the start of the process
  }

  downloadReport(): void {
    const data = {
      ...this.predictionResult,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagnosis_report.json';
    link.click();

    window.URL.revokeObjectURL(url); // Cleanup
  }
}
