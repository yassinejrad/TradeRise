import { Component, OnInit } from '@angular/core';
import {HistoricalDataService} from "../../../services/historicalData/historical-data.service";

@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.scss']
})
export class StockOverviewComponent implements OnInit {
  chartData: any[] = [];
  symbol = 'AAPL';
  constructor(private historicalDataService:HistoricalDataService) { }

  ngOnInit(): void {
    this.candleStickChart();
  }
  candleStickChart(){
    this.historicalDataService.getDailyTimeSeriesData(this.symbol).subscribe(data => {
      // Parse the data to extract date, open, high, low, close
      this.chartData = this.parseData(data);
    });
  }
  private parseData(data: any): any[] {
    const chartData = [];

    for (const date in data['Time Series (Daily)']) {
      if (data['Time Series (Daily)'].hasOwnProperty(date)) {
        const entry = data['Time Series (Daily)'][date];
        const chartEntry = {
          date: date,
          open: parseFloat(entry['1. open']),
          high: parseFloat(entry['2. high']),
          low: parseFloat(entry['3. low']),
          close: parseFloat(entry['4. close']),
          volume: parseInt(entry['5. volume'])
        };
        chartData.push(chartEntry);
      }
    }
    return chartData;
  }
}
