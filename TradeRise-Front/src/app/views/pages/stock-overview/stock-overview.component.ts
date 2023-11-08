import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HistoricalDataService } from "../../../services/historicalData/historical-data.service";
import {Chart} from "chart.js";
import {CanvasJS} from "@canvasjs/angular-stockcharts";
import {RiskManagementService} from "../../../services/Risk/risk-management.service";


@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.scss']
})
export class StockOverviewComponent implements OnInit {
  chartData: any[] = [];
  symbol = 'IBM';
  volatlity=0;
  valueAR=0;
  @ViewChild('candlestickChart') candlestickChartRef: ElementRef;
  constructor(private historicalDataService:HistoricalDataService,private riskManagementService:RiskManagementService) {  }

  ngOnInit(): void {
    this.candleStickChart();
    this.calculateVolatility(this.symbol);
    this.calculateVaR(this.symbol);
  }
  candleStickChart() {
    this.historicalDataService.getDailyTimeSeriesData(this.symbol).subscribe(data => {
      const chartData = this.parseData(data);
      const canvas = this.candlestickChartRef.nativeElement;

      const options = {
        title: {
          text: "Candlestick Chart"
        },
        axisX: {
          valueFormatString: "MMM YYYY",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM YYYY"
          }
        },
        axisY: {
          title: "Price",
          prefix: "$",
          crosshair: {
            enabled: true
          }
        },
        data: [{
          type: "candlestick",
          dataPoints: chartData.map(entry => ({
            x: new Date(entry.date),
            y: [entry.open, entry.high, entry.low, entry.close]
          }))
        }]
      };

      const chart = new CanvasJS.Chart(canvas, options);
      chart.render();
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
  calculateVolatility(symbol: string) {
    this.riskManagementService.calculateVolatility(symbol).subscribe(
      result => {
        this.volatlity=result;
      },
      error => {
        console.error('Error calculating volatility:', error);
      }
    );
  }
  calculateVaR(symbol: string) {
    this.riskManagementService.calculateVaR(symbol).subscribe(
      result => {
        this.valueAR=result;
      },
      error => {
        console.error('Error calculating VaR:', error);
      }
    );
  }
}

