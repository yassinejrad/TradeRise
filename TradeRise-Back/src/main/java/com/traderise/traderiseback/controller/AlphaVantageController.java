package com.traderise.traderiseback.controller;

import com.traderise.traderiseback.service.AlphaVantageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AlphaVantageController {
    @Autowired
    AlphaVantageService alphaVantageService;
    @GetMapping("/historical-data/{symbol}")
    public String getHistoricalData(
            @PathVariable String symbol,
            @RequestParam String interval
    ) {
        return alphaVantageService.getHistoricalData(symbol, interval);
    }
    @GetMapping("/getDailyTimeSeriesData/{symbol}")
    public String getDailyTimeSeriesData(@PathVariable String symbol) {
        return alphaVantageService.getDailyTimeSeriesData(symbol);
    }
    @GetMapping("/symbols")
    public List<String> getAllSymbols() {
        return alphaVantageService.getAllSymbols();
    }
}
