package com.traderise.traderiseback.service;

import com.traderise.traderiseback.entity.BollingerBandsData;
import com.traderise.traderiseback.entity.MovingAverageData;
import com.traderise.traderiseback.entity.StockPrice;

import java.util.List;

public interface IRiskManagementService {
    public List<Double> runRiskManagementAnalysis(String symbol, String interval, int numberOfSimulations);
    double calculateVolatility(String symbol);

   double calculateHistoricalVaR( String symbol);
    List<MovingAverageData> runCalculateMovingAverages(String symbol, int period);
    List<MovingAverageData> runExponentialMovingAverages( String symbol,int period);
    List<MovingAverageData> getRsiChartData(String symbol);
    List<BollingerBandsData> getBollingerBandsData(String symbol, int period);
}
