import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatientHistory(): Observable<any[]> {
    // Endpoint către backend pentru obținerea istoricului
    return this.http.get<any[]>('/api/patient/history');
  }
}
