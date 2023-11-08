import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  private apiUrl = 'http://localhost:8089/getDailyTimeSeriesData/';
  constructor(private http: HttpClient) { }
  getDailyTimeSeriesData(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${symbol}`);
  }
}
