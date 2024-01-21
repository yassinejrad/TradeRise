import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  private apiUrl = 'http://localhost:808/getDailyTimeSeriesData/';
  private apiUrlNews = 'http://localhost:808/getNewsSentimentForSymbol/';
  constructor(private http: HttpClient) { }
  getDailyTimeSeriesData(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${symbol}`);
  }
  getNewsSentimentForSymbol(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlNews}${symbol}`);
  }
}
