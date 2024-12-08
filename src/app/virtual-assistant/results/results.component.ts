import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from 'src/app/services/prediction.service';
import { ResultsStateService } from 'src/app/services/results-state.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  userId: string = 'user123';
  selectedSymptoms: string[] = [];
  predictionResult: any = null;

  constructor(private predictionService: PredictionService, private router: Router, private route: ActivatedRoute, private resultsStateService: ResultsStateService) {}

  ngOnInit(): void {
    this.predictionResult = this.resultsStateService.getPredictionResult();

    if (this.predictionResult) {
      console.log('Received Prediction Result:', this.predictionResult); // Debugging
    } else {
      console.error('No prediction result found!');
      // Redirect to symptoms page if no result is available
      this.router.navigate(['/virtual-assistant/symptoms']);
    }
  }

  fetchPrediction(): void {
    if (this.selectedSymptoms.length > 0) {
      this.predictionService.predictDisease(this.userId, this.selectedSymptoms).subscribe(
        (response) => {
          this.predictionResult = response;
          console.log('Prediction Result:', response);
        },
        (error) => {
          console.error('Prediction Error:', error);
        }
      );
    }
  }

  downloadReport(format: 'json' | 'text' | 'csv' = 'json'): void {
    if (!this.predictionResult) {
      console.error('No prediction result to download!');
      return;
    }
  
    let blob: Blob;
    let fileName: string;
  
    if (format === 'json') {
      // JSON format
      const reportData = {
        Diagnosis: this.predictionResult.prognosis,
        Description: this.predictionResult.description,
        Severity: this.predictionResult.severity,
        Recommendations: this.predictionResult.recommendations || {
          urgency: 'Not specified',
          specialist: 'Not specified',
        },
        Precautions: this.predictionResult.precautions || [],
      };
  
      const jsonContent = JSON.stringify(reportData, null, 2);
      blob = new Blob([jsonContent], { type: 'application/json' });
      fileName = `diagnosis_report_${new Date().toISOString()}.json`;
    } else if (format === 'text') {
      // Plain text format
      const textContent = `
  Diagnosis: ${this.predictionResult.prognosis}
  Description: ${this.predictionResult.description}
  Severity: ${this.predictionResult.severity}
  Recommendations:
    - Urgency: ${this.predictionResult.recommendations?.urgency}
    - Specialist: ${this.predictionResult.recommendations?.specialist}
  Precautions:
  ${this.predictionResult.precautions.join('\n')}
  `;
      blob = new Blob([textContent], { type: 'text/plain' });
      fileName = `diagnosis_report_${new Date().toISOString()}.txt`;
    } else if (format === 'csv') {
      // CSV format
      const csvContent = `Diagnosis,Description,Severity,Recommendations (Urgency),Recommendations (Specialist),Precautions
  "${this.predictionResult.prognosis}","${this.predictionResult.description}",${this.predictionResult.severity},"${this.predictionResult.recommendations?.urgency}","${this.predictionResult.recommendations?.specialist}","${this.predictionResult.precautions.join('; ')}"
  `;
      blob = new Blob([csvContent], { type: 'text/csv' });
      fileName = `diagnosis_report_${new Date().toISOString()}.csv`;
    } else {
      console.error('Unsupported format for report download');
      return;
    }
  
    // Trigger file download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  

  ngOnDestroy(): void {
    this.resultsStateService.clearPredictionResult();
  }
}
