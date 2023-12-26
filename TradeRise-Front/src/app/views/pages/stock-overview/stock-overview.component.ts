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
  newsData: any[] = [];
  @ViewChild('candlestickChart') candlestickChartRef: ElementRef;
  constructor(private historicalDataService:HistoricalDataService,private riskManagementService:RiskManagementService) {  }

  ngOnInit(): void {
    this.candleStickChart();
    this.calculateVolatility(this.symbol);
    this.calculateVaR(this.symbol);
    this.getNews();
  }
  clickPress(){
    this.candleStickChart();
    this.calculateVolatility(this.symbol);
    this.calculateVaR(this.symbol);
    this.getNews();
  }
  getNews() {
    this.historicalDataService.getNewsSentimentForSymbol(this.symbol).subscribe(
      data => {
        console.log('Raw data:', data);
        this.newsData = this.parseDataNews(data.feed);
        console.log(this.newsData);
      },
      error => {
        console.error('Error fetching news data:', error);
      }
    );
  }

  private parseDataNews(feed: any[]): any[] {
    const parsedData = [];

    for (const item of feed) {
      const parsedItem = {
        title: item.title,
        summary: item.summary,
        bannerImage: item.banner_image,
        topics: item.topics.map((topic: any) => ({
          topic: topic.topic,
          relevanceScore: parseFloat(topic.relevance_score)
        })),
        overallSentiment: {
          score: item.overall_sentiment_score,
          label: item.overall_sentiment_label
        },
        tickerSentiment: item.ticker_sentiment.map((tickerSentiment: any) => ({
          ticker: tickerSentiment.ticker,
          relevanceScore: parseFloat(tickerSentiment.relevance_score),
          sentimentScore: parseFloat(tickerSentiment.ticker_sentiment_score),
          sentimentLabel: tickerSentiment.ticker_sentiment_label
        }))
      };
      parsedData.push(parsedItem);
    }

    return parsedData;
  }

  candleStickChart() {
    this.historicalDataService.getDailyTimeSeriesData(this.symbol).subscribe(data => {
      const chartData = this.parseData(data);
      const canvas = this.candlestickChartRef.nativeElement;

      const options = {
        title: {
          text: "Candlestick and Column Chart"
        },
        axisX: {
          valueFormatString: "MMM YYYY",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM YYYY"
          }
        },
        axisY: [{
          title: "Price",
          prefix: "$",
          crosshair: {
            enabled: true
          }
        }, {
          title: "Volume",
          crosshair: {
            enabled: true
          },
          reversed: true
        }],
        toolTip: {
          shared: true
        },
        data: [{
          type: "candlestick",
          showInLegend: true,
          name: "Candlestick",
          dataPoints: chartData.map(entry => ({
            x: new Date(entry.date),
            y: [entry.open, entry.high, entry.low, entry.close]
          }))
        }, {
          type: "column",
          showInLegend: true,
          name: "Volume",
          dataPoints: chartData.map(entry => ({
            x: new Date(entry.date),
            y: entry.volume
          }))
        }],
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

