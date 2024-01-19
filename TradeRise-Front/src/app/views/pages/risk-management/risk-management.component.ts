import {Component, OnInit} from '@angular/core';
import {RiskManagementService} from "../../../services/Risk/risk-management.service";

@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {

  symbol: string = 'AAPL';  // Default value for symbol
  interval: number = 15;  // Default value for interval
  numberOfSimulations: number = 100;
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return   value + ' $'; // Add '$' as the prefix
          }
        }
      }
    },
  };
  lineChartLegend = true;
  constructor(private riskManagementService: RiskManagementService) { }
  ngOnInit(): void {
    this.getRiskManagementData();
  }

  getRiskManagementData() {
    this.riskManagementService.runRiskManagement(this.symbol, this.interval+'min', this.numberOfSimulations)
      .subscribe(data => {
        this.lineChartOptions.scales.y.min = Math.round(Math.min(...data)) - 2;
        this.lineChartData = [{ data: data, label: 'simulated Prices based on MonteCarlo method ' }];
        this.lineChartLabels = Array.from({ length: data.length }, (_, i) => (i * this.interval).toString() + 'min');
      });
  }



}
