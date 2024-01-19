package com.traderise.traderiseback.controller;

import com.traderise.traderiseback.entity.BollingerBandsData;
import com.traderise.traderiseback.entity.MovingAverageData;
import com.traderise.traderiseback.service.RiskManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class RiskManagementController {
    @Autowired
    RiskManagementService riskManagementService;

    public RiskManagementController(RiskManagementService riskManagementService) {
        this.riskManagementService = riskManagementService;
    }

    @GetMapping("/riskManagement")
    public List<Double> runRiskManagement(
            @RequestParam String symbol,
            @RequestParam String interval,
            @RequestParam int numberOfSimulations) {
        return riskManagementService.runRiskManagementAnalysis(symbol, interval, numberOfSimulations);
    }
    @GetMapping("/volatility/{symbol}")
    public double calculateVolatility(@PathVariable String symbol) {
        return riskManagementService.calculateVolatility(symbol);
    }
    @GetMapping("/var/{symbol}")
    public double calculateVaR(@PathVariable String symbol) {
        return riskManagementService.calculateHistoricalVaR(symbol);
    }
    @GetMapping("/MovingAverages")
    public List<MovingAverageData> runMovingAverages(
            @RequestParam String symbol,
            @RequestParam int periode) {
        return riskManagementService.runCalculateMovingAverages(symbol, periode);
    }
    @GetMapping("/ExponentialMovingAverages")
    public List<MovingAverageData> runExponentialMovingAverages(
            @RequestParam String symbol,
            @RequestParam int periode) {
        return riskManagementService.runExponentialMovingAverages(symbol, periode);
    }
    @GetMapping("/getRsiChartData")
    public List<MovingAverageData> getRsiChartData(
            @RequestParam String symbol) {
        return riskManagementService.getRsiChartData(symbol);
    }
    @GetMapping("/getBollingerBandsData")
    public List<BollingerBandsData> getBollingerBandsData(
            @RequestParam String symbol,
            @RequestParam int periode) {
        return riskManagementService.getBollingerBandsData(symbol, periode);
    }
}
