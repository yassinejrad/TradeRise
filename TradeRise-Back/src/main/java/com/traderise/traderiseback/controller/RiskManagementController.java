package com.traderise.traderiseback.controller;

import com.traderise.traderiseback.service.RiskManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
