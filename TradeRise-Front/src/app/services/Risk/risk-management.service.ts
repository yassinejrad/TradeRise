import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RiskManagementService {

  private apiUrl = 'http://localhost:808/riskManagement';
  private Url = 'http://localhost:808';
  private UrlMoving = 'http://localhost:808';
  private UrlEMoving = 'http://localhost:808';
  private UrlRSI = 'http://localhost:808';
  private UrlBB = 'http://localhost:808';

  constructor(private http: HttpClient) { }

  runRiskManagement(symbol: string, interval: string, numberOfSimulations: number): Observable<number[]> {
    const url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&numberOfSimulations=${numberOfSimulations}`;
    return this.http.get<number[]>(url);
  }
  calculateVolatility(symbol: string): Observable<number> {
    return this.http.get<number>(`${this.Url}/volatility/${symbol}`);
  }
  calculateVaR(symbol: string): Observable<number> {
    return this.http.get<number>(`${this.Url}/var/${symbol}`);
  }
  runMovingAverages(symbol: string, periode: number): Observable<any> {
    const url = `${this.UrlMoving}/MovingAverages?symbol=${symbol}&periode=${periode}`;
    return this.http.get<any>(url);
  }
  runExponentialMovingAverages(symbol: string, periode: number): Observable<any> {
    const url = `${this.UrlEMoving}/ExponentialMovingAverages?symbol=${symbol}&periode=${periode}`;
    return this.http.get<any>(url);
  }
  getRsiChartData(symbol: string): Observable<any> {
    const url = `${this.UrlRSI}/getRsiChartData?symbol=${symbol}`;
    return this.http.get<any>(url);
  }
  getBollingerBandsData(symbol: string, periode: number): Observable<any> {
    const url = `${this.UrlBB}/getBollingerBandsData?symbol=${symbol}&periode=${periode}`;
    return this.http.get<any>(url);
  }
}
