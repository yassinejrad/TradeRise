package com.traderise.traderiseback.service;

import java.util.List;

public interface IRiskManagementService {
    public List<Double> runRiskManagementAnalysis(String symbol, String interval, int numberOfSimulations);
    double calculateVolatility(String symbol);
}
