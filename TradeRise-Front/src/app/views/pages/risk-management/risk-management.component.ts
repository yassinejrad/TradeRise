import { Component, OnInit } from '@angular/core';
import {RiskManagementService} from "../../../services/Risk/risk-management.service";

@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {

  symbol: string = 'AAPL';  // Default value for symbol
  interval: string = '15min';  // Default value for interval
  numberOfSimulations: number = 100;
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  constructor(private riskManagementService: RiskManagementService) { }
  ngOnInit(): void {
    this.getRiskManagementData();
  }

  getRiskManagementData() {
    this.riskManagementService.runRiskManagement(this.symbol, this.interval, this.numberOfSimulations)
      .subscribe(data => {
        this.lineChartData = [{ data: data, label: 'simulatedPrices based on MonteCarlo method ' }];
        this.lineChartLabels = Array.from({ length: data.length }, (_, i) => (i * 15).toString() + 'min');
      });
  }
}
