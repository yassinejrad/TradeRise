import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HistoricalDataService} from "../../../services/historicalData/historical-data.service";
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
  @ViewChild('movingAveragesChart') movingAveragesChartRef: ElementRef;
  @ViewChild('exponentialMovingAveragesChart') exponentialMovingAveragesChartRef: ElementRef;
  @ViewChild('rsiChart') rsiChartRef: ElementRef;
  @ViewChild('BollingerBands') BollingerBandsChartRef: ElementRef;

  selectedChart: 'candlestick' | 'movingAverages' | 'exponentialMovingAverages' | 'rsi' | 'BollingerBands' = 'candlestick';



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
        this.newsData = this.parseDataNews(data.feed);
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
          text: "Candlestick and Volume Chart"
        },
        axisX: {
          valueFormatString: "MMM YYYY",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM YYYY"
          }
        },
        axisY: [
          {
            title: "Price",
            prefix: "$",
            crosshair: {
              enabled: true
            }
          },
          {
            title: "Volume",
            crosshair: {
              enabled: true
            },
          }
        ],
        toolTip: {
          shared: true
        },
        data: [

          {
            type: "column",
            showInLegend: true,
            name: "Volume",
            yValueFormatString: "##0.00",
            fillOpacity: 0.5,
            axisYType: "secondary",
            dataPoints: chartData.map(entry => ({
              x: new Date(entry.date),
              y: entry.volume
            }))
          },{
            type: "candlestick",
            showInLegend: true,
            name: "Candlestick",
            yValueFormatString: "$##0.00",
            risingColor: "green",
            fallingColor: "red",
            dataPoints: chartData.map(entry => ({
              x: new Date(entry.date),
              y: [entry.open, entry.high, entry.low, entry.close]
            }))
          }
        ],
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
  MovingAveragesChart() {

    this.historicalDataService.getDailyTimeSeriesData(this.symbol).subscribe(dailyData => {
      const chartData = this.parseData(dailyData);

      // Fetch moving averages data for the first period (20)
      this.riskManagementService.runMovingAverages(this.symbol, 20).subscribe(movingAveragesData20 => {
        // Prepare dataPoints for moving averages with period 20
        const movingAveragesDataPoints20 = movingAveragesData20.map((average: any) => ({
          x: new Date(average.date),
          y: average.average,
        }));

        // Fetch moving averages data for the second period (50)
        this.riskManagementService.runMovingAverages(this.symbol, 50).subscribe(movingAveragesData50 => {
          // Prepare dataPoints for moving averages with period 50
          const movingAveragesDataPoints50 = movingAveragesData50.map((average: any) => ({
            x: new Date(average.date),
            y: average.average,
          }));

          // Get reference to the chart canvas
          const canvas = this.movingAveragesChartRef.nativeElement;

          // Set up chart options
          const options = {
            title: {
              text: "Combined Chart - Candlestick and Simple Moving Averages"
            },
            axisX: {
              valueFormatString: "MMM YYYY",
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "MMM YYYY"
              }
            },
            axisY: [
              {
                title: "Price",
                prefix: "$",
                crosshair: {
                  enabled: true
                }
              }
            ],
            toolTip: {
              shared: true
            },
            data: [
              {
                type: "candlestick",
                showInLegend: true,
                name: "Candlestick",
                yValueFormatString: "$##0.00",
                risingColor: "green",
                fallingColor: "red",
                dataPoints: chartData.map(entry => ({
                  x: new Date(entry.date),
                  y: [entry.open, entry.high, entry.low, entry.close]
                }))
              },
              {
                type: "line",
                showInLegend: true,
                yValueFormatString: "$##0.00",
                name: "20 Days SMA",
                dataPoints: movingAveragesDataPoints20
              },
              {
                type: "line",
                showInLegend: true,
                yValueFormatString: "$##0.00",
                name: "50 Days SMA",
                dataPoints: movingAveragesDataPoints50
              }
            ],
          };

          // Render the chart
          const chart = new CanvasJS.Chart(canvas, options);
          chart.render();
        });
      });
    });
  }
  ExponentialMovingAveragesChart() {

    this.historicalDataService.getDailyTimeSeriesData(this.symbol).subscribe(dailyData => {
      const chartData = this.parseData(dailyData);

      // Fetch moving averages data for the first period (20)
      this.riskManagementService.runExponentialMovingAverages(this.symbol, 20).subscribe(movingAveragesData20 => {
        // Prepare dataPoints for moving averages with period 20
        const movingAveragesDataPoints20 = movingAveragesData20.map((average: any) => ({
          x: new Date(average.date),
          y: average.average,
        }));

        // Fetch moving averages data for the second period (50)
        this.riskManagementService.runExponentialMovingAverages(this.symbol, 50).subscribe(movingAveragesData50 => {
          // Prepare dataPoints for moving averages with period 50
          const movingAveragesDataPoints50 = movingAveragesData50.map((average: any) => ({
            x: new Date(average.date),
            y: average.average,
          }));

          // Get reference to the chart canvas
          const canvas = this.exponentialMovingAveragesChartRef.nativeElement;

          // Set up chart options
          const options = {
            title: {
              text: "Combined Chart - Candlestick and Exponential Moving Averages"
            },
            axisX: {
              valueFormatString: "MMM YYYY",
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "MMM YYYY"
              }
            },
            axisY: [
              {
                title: "Price",
                prefix: "$",
                crosshair: {
                  enabled: true
                }
              }
            ],
            toolTip: {
              shared: true
            },
            data: [
              {
                type: "candlestick",
                showInLegend: true,
                name: "Candlestick",
                yValueFormatString: "$##0.00",
                risingColor: "green",
                fallingColor: "red",
                dataPoints: chartData.map(entry => ({
                  x: new Date(entry.date),
                  y: [entry.open, entry.high, entry.low, entry.close]
                }))
              },
              {
                type: "line",
                showInLegend: true,
                yValueFormatString: "$##0.00",
                name: "20 Days EMA",
                dataPoints: movingAveragesDataPoints20
              },
              {
                type: "line",
                showInLegend: true,
                yValueFormatString: "$##0.00",
                name: "50 Days EMA",
                dataPoints: movingAveragesDataPoints50
              }
            ],
          };

          // Render the chart
          const chart = new CanvasJS.Chart(canvas, options);
          chart.render();
        });
      });
    });
  }
  rsiChart() {
    this.riskManagementService.getRsiChartData(this.symbol).subscribe(data => {


      if (data && data.length > 0) {
        const rsiPoints = data.map((average: any) => ({
          x: new Date(average.date),
          y: average.average,
        }));



        const canvas = this.rsiChartRef.nativeElement;

        const options = {
          title: {
            text: "RSI Chart"
          },
          axisX: {
            valueFormatString: "MMM YYYY",
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "MMM YYYY"
            }
          },
          axisY: [
            {
              title: "Price",
              prefix: "$",
              crosshair: {
                enabled: true
              }
            },
          ],
          toolTip: {
            shared: true
          },
          data: [
            {
              type: "line",
              showInLegend: true,
              name: "Price",
              yValueFormatString: "£##0.00",
              color: 'black',
              dataPoints: rsiPoints
            }
          ],
        };

        const chart = new CanvasJS.Chart(canvas, options);
        chart.render();
      } else {
        console.warn('RSI Data is empty.');
      }
    });
  }
  bollingerBandsChart() {

    this.riskManagementService.getBollingerBandsData(this.symbol,20).subscribe(data => {

      const canvas = this.BollingerBandsChartRef.nativeElement;
      console.log(data);

      const options = {
        title: {
          text: 'Bollinger Bands Chart'
        },
        axisX: {
          valueFormatString: 'MMM YYYY',
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: 'MMM YYYY'
          }
        },
        axisY: [
          {
            title: 'Price',
            prefix: '$',
            crosshair: {
              enabled: true
            }
          }
        ],
        toolTip: {
          shared: true
        },
        data: [
          {
            type: 'rangeArea',
            showInLegend: true,
            name: 'Bollinger Bands',
            yValueFormatString: '$##0.00',
            fillOpacity: 0.2,
            dataPoints: data.map((entry: { date: string | number | Date; lowerBand: any; upperBand: any; }) => ({
              x: new Date(entry.date),
              y: [entry.lowerBand, entry.upperBand]
            }))
          },
          {
            type: 'line',
            showInLegend: true,
            name: '20 Days SMA',
            yValueFormatString: '$##0.00',
            color:'Black',
            dataPoints: data.map((entry: { date: string | number | Date; middleBand: any; }) => ({
              x: new Date(entry.date),
              y: entry.middleBand
            }))
          }
        ],
      };

      const chart = new CanvasJS.Chart(canvas, options);
      chart.render();
    });
  }



}

