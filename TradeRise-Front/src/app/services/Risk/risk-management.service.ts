import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RiskManagementService {

  private apiUrl = 'http://localhost:8089/riskManagement';

  constructor(private http: HttpClient) { }

  runRiskManagement(symbol: string, interval: string, numberOfSimulations: number): Observable<number[]> {
    const url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&numberOfSimulations=${numberOfSimulations}`;
    return this.http.get<number[]>(url);
  }
  calculateVolatility(symbol: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/volatility/${symbol}`);
  }
  calculateVaR(symbol: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/var/${symbol}`);
  }
}
