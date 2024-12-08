import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private baseUrl = 'http://your-backend-api.com'; // Update this with your backend URL

  constructor(private http: HttpClient) {}

  getPredictionResults(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/predict`);
  }
}
