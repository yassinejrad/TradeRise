package com.traderise.traderiseback.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.traderise.traderiseback.entity.BollingerBandsData;
import com.traderise.traderiseback.entity.MovingAverageData;
import com.traderise.traderiseback.entity.StockPrice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class RiskManagementService implements IRiskManagementService{
    @Autowired
    AlphaVantageService alphaVantageService;
    public List<Double> runMonteCarloSimulation(double[] historicalPrices, int numberOfSimulations) {
        List<Double> simulatedPrices = new ArrayList<>();

        // Calculate daily returns
        if (historicalPrices.length < 2) {
            throw new IllegalArgumentException("Insufficient historical data to calculate daily returns");
        }
        double[] dailyReturns = new double[historicalPrices.length - 1];

        for (int i = 1; i < historicalPrices.length; i++) {
            dailyReturns[i - 1] = (historicalPrices[i] - historicalPrices[i - 1]) / historicalPrices[i - 1];
        }

        // Calculate mean and standard deviation of returns
        double meanReturn = calculateMean(dailyReturns);
        double stdDevReturn = calculateStandardDeviation(dailyReturns, meanReturn);

        Random random = new Random();

        // Simulate future prices
        for (int i = 0; i < numberOfSimulations; i++) {
            double lastPrice = historicalPrices[historicalPrices.length - 1];
            for (int j = 0; j < dailyReturns.length; j++) {
                lastPrice *= 1 + (meanReturn + stdDevReturn * random.nextGaussian());
            }
            simulatedPrices.add(lastPrice);
        }

        return simulatedPrices;
    }


    private double calculateMean(double[] returns) {
        double sum = 0;
        for (double r : returns) {
            sum += r;
        }
        return sum / returns.length;
    }

    private double calculateStandardDeviation(double[] returns, double mean) {
        double sumSquaredDiff = 0;
        for (double r : returns) {
            sumSquaredDiff += Math.pow(r - mean, 2);
        }
        return Math.sqrt(sumSquaredDiff / (returns.length - 1));
    }
    public List<Double> runRiskManagementAnalysis(String symbol, String interval, int numberOfSimulations) {
        String historicalData = alphaVantageService.getHistoricalData(symbol, interval);
        System.out.println(historicalData);

        // Parse historical data and extract prices
        double[] historicalPrices = parseHistoricalData(historicalData,interval);
        // Run Monte Carlo simulation
        return runMonteCarloSimulation(historicalPrices, numberOfSimulations);
    }



    private double[] parseHistoricalData(String historicalData,String interval) {
        List<Double> prices = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(historicalData);

            // Assuming the data is in "Time Series (15min)" format
            JsonNode timeSeriesNode = rootNode.get("Time Series ("+interval+")");

            // Loop through the time series and extract prices
            if (timeSeriesNode != null) {
                for (Iterator<Map.Entry<String, JsonNode>> it = timeSeriesNode.fields(); it.hasNext(); ) {
                    Map.Entry<String, JsonNode> entry = it.next();
                    JsonNode priceNode = entry.getValue().get("1. open");
                    if (priceNode != null) {
                        double price = priceNode.asDouble();
                        prices.add(price);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }

        // Convert the list of prices to an array
        double[] historicalPrices = new double[prices.size()];
        for (int i = 0; i < prices.size(); i++) {
            historicalPrices[i] = prices.get(i);
        }

        return historicalPrices;
    }
    public double calculateVolatility(String symbol) {
        // Step 1: Retrieve Historical Data from Alpha Vantage
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);

        // Step 2: Calculate Daily Returns
        List<Double> dailyReturns = calculateDailyReturns(historicalData);

        // Step 3: Calculate Standard Deviation

        return calculateStandardDeviation(dailyReturns);
    }

    private List<Double> calculateDailyReturns(String historicalData) {
        List<Double> dailyReturns = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(historicalData);

            JsonNode timeSeriesNode = rootNode.get("Time Series (Daily)");

            if (timeSeriesNode != null) {
                Iterator<Map.Entry<String, JsonNode>> iterator = timeSeriesNode.fields();

                String prevDate = null;
                double prevClose = 0.0;

                while (iterator.hasNext()) {
                    Map.Entry<String, JsonNode> entry = iterator.next();
                    String date = entry.getKey();
                    double close = entry.getValue().get("4. close").asDouble();

                    if (prevDate != null) {
                        double dailyReturn = (close - prevClose) / prevClose;
                        dailyReturns.add(dailyReturn);
                    }

                    prevDate = date;
                    prevClose = close;
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }

        return dailyReturns;
    }

    private double calculateStandardDeviation(List<Double> returns) {
        double sum = 0.0;
        double mean = calculateMean(returns);

        for (double r : returns) {
            sum += Math.pow(r - mean, 2);
        }

        double variance = sum / (returns.size() - 1);
        return Math.sqrt(variance);
    }

    private double calculateMean(List<Double> returns) {
        double sum = 0.0;
        for (double r : returns) {
            sum += r;
        }
        return sum / returns.size();
    }

    public double calculateHistoricalVaR(String symbol) {
        double confidenceLevel = 0.95;
        // Step 1: Retrieve Historical Data from Alpha Vantage
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);

        // Step 2: Calculate Daily Returns
        List<Double> dailyReturns = calculateDailyReturns(historicalData);

        // Step 3: Sort Returns
        Collections.sort(dailyReturns);

        // Step 4: Calculate VaR
        int index = (int) Math.ceil((1 - confidenceLevel) * dailyReturns.size());
        return dailyReturns.get(index - 1);
    }
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    public static List<StockPrice> parseAlphaVantageData(String historicalData) {
        List<StockPrice> stockPrices = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(historicalData);

            // Assuming the response has a "Time Series (Daily)" node
            JsonNode timeSeriesNode = root.path("Time Series (Daily)");

            Iterator<String> dateIterator = timeSeriesNode.fieldNames();
            while (dateIterator.hasNext()) {
                String dateStr = dateIterator.next();
                JsonNode dateNode = timeSeriesNode.path(dateStr);

                StockPrice stockPrice = new StockPrice();
                try {
                    Date date = dateFormat.parse(dateStr);
                    stockPrice.setDate(date);
                } catch (ParseException e) {
                    e.printStackTrace();

                }


                stockPrice.setClose(dateNode.path("4. close").asDouble());

                stockPrices.add(stockPrice);
            }
        } catch (IOException e) {
            e.printStackTrace();

        }

        return stockPrices;
    }

    public static List<MovingAverageData> calculateMovingAverages(List<StockPrice> stockPrices, int period) {
        List<MovingAverageData> movingAverages = new ArrayList<>();

        for (int i = period - 1; i < stockPrices.size(); i++) {
            Date currentDate = stockPrices.get(i).getDate();
            double sum = 0;

            // Calculate the sum of closing prices for the specified period
            for (int j = i - (period - 1); j <= i; j++) {
                sum += stockPrices.get(j).getClose();
            }

            // Calculate the moving average
            double average = sum / period;

            MovingAverageData movingAverageData = new MovingAverageData();
            movingAverageData.setDate(currentDate);
            movingAverageData.setAverage(average);

            movingAverages.add(movingAverageData);
        }

        return movingAverages;
    }
    public  List<MovingAverageData> runCalculateMovingAverages( String symbol,int period){
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);
        List<StockPrice> stockPricesList = parseAlphaVantageData(historicalData);

        return calculateMovingAverages(stockPricesList,period);
    }



    public static List<MovingAverageData> calculateExponentialMovingAverages(List<StockPrice> stockPrices, int period) {
        List<MovingAverageData> emaList = new ArrayList<>();

        double multiplier = 2.0 / (period + 1);

        // Calculate the initial SMA as the average of the first 'period' prices
        double sum = 0;
        for (int i = 0; i < period; i++) {
            sum += stockPrices.get(i).getClose();
        }
        double sma = sum / period;

        // The first EMA value is the same as the initial SMA
        emaList.add(new MovingAverageData(stockPrices.get(period - 1).getDate(), sma));

        // Calculate the EMA for the rest of the data
        for (int i = period; i < stockPrices.size(); i++) {
            double closePrice = stockPrices.get(i).getClose();
            double ema = (closePrice - emaList.get(emaList.size() - 1).getAverage()) * multiplier + emaList.get(emaList.size() - 1).getAverage();
            emaList.add(new MovingAverageData(stockPrices.get(i).getDate(), ema));
        }

        return emaList;
    }
    @Override
    public List<MovingAverageData> runExponentialMovingAverages(String symbol, int period) {
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);
        List<StockPrice> stockPricesList = parseAlphaVantageData(historicalData);

        return calculateExponentialMovingAverages(stockPricesList,period);
    }
    public List<MovingAverageData> getRsiChartData(String symbol) {
        // Fetch historical data from Alpha Vantage
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);

        // Parse historical data and calculate RSI values
        List<StockPrice> stockPrices = parseAlphaVantageData(historicalData);
        List<MovingAverageData> rsiDataList = calculateRsiValues(stockPrices);

        return rsiDataList;
    }

    private List<MovingAverageData> calculateRsiValues(List<StockPrice> stockPrices) {
        List<MovingAverageData> rsiDataList = new ArrayList<>();

        for (int i = 14; i < stockPrices.size(); i++) {
            // Calculate average gain and average loss over the last 14 days (adjust as needed)
            double avgGain = calculateAverageGain(stockPrices, i, 14);
            double avgLoss = calculateAverageLoss(stockPrices, i, 14);

            // Calculate relative strength (RS)
            double rs = (avgGain == 0) ? 0 : avgGain / avgLoss;

            // Calculate RSI
            double rsiValue = 100 - (100 / (1 + rs));

            // Create RsiData object
            MovingAverageData rsiData = new MovingAverageData();
            rsiData.setDate(stockPrices.get(i).getDate());
            rsiData.setAverage(rsiValue);

            rsiDataList.add(rsiData);
        }

        return rsiDataList;
    }

    private double calculateAverageGain(List<StockPrice> stockPrices, int currentIndex, int period) {
        double sumGain = 0;

        for (int i = currentIndex - period + 1; i <= currentIndex; i++) {
            double priceDifference = stockPrices.get(i).getClose() - stockPrices.get(i - 1).getClose();
            double gain = (priceDifference > 0) ? priceDifference : 0;
            sumGain += gain;
        }

        return sumGain / period;
    }

    private double calculateAverageLoss(List<StockPrice> stockPrices, int currentIndex, int period) {
        double sumLoss = 0;

        for (int i = currentIndex - period + 1; i <= currentIndex; i++) {
            double priceDifference = stockPrices.get(i).getClose() - stockPrices.get(i - 1).getClose();
            double loss = (priceDifference < 0) ? -priceDifference : 0;
            sumLoss += loss;
        }

        return sumLoss / period;
    }
    private List<BollingerBandsData> calculateBollingerBands(List<StockPrice> stockPrices, int period) {
        List<BollingerBandsData> bollingerBandsDataList = new ArrayList<>();

        // Implement your logic to calculate Bollinger Bands
        // Iterate through stock prices and calculate upper, middle, and lower bands
        for (int i = period - 1; i < stockPrices.size(); i++) {
            // Calculate the average of the closing prices for the specified period
            double sum = 0;
            for (int j = i - (period - 1); j <= i; j++) {
                sum += stockPrices.get(j).getClose();
            }
            double average = sum / period;

            // Calculate standard deviation
            double sumSquaredDiff = 0;
            for (int j = i - (period - 1); j <= i; j++) {
                double diff = stockPrices.get(j).getClose() - average;
                sumSquaredDiff += diff * diff;
            }
            double standardDeviation = Math.sqrt(sumSquaredDiff / period);

            // Calculate Bollinger Bands
            double upperBand = average + (standardDeviation * standardDeviation);
            double lowerBand = average - (standardDeviation * standardDeviation);

            // Create BollingerBandsData object and add to the list
            BollingerBandsData bandsData = new BollingerBandsData();
            bandsData.setDate(stockPrices.get(i).getDate());
            bandsData.setUpperBand(upperBand);
            bandsData.setMiddleBand(average);
            bandsData.setLowerBand(lowerBand);

            bollingerBandsDataList.add(bandsData);
        }

        return bollingerBandsDataList;
    }
    @Override
    public List<BollingerBandsData> getBollingerBandsData(String symbol, int period) {
        String historicalData = alphaVantageService.getDailyTimeSeriesData(symbol);
        List<StockPrice> stockPricesList = parseAlphaVantageData(historicalData);

        return calculateBollingerBands(stockPricesList, period);
    }



}



