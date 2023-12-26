package com.traderise.traderiseback.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class AlphaVantageService {
    private final String apiKey;
    @Autowired
    private RestTemplate restTemplate;
    public AlphaVantageService(@Value("${alphaVantage.apiKey}") String apiKey) {
        this.apiKey = apiKey;
    }

    public String getHistoricalData(String symbol, String interval) {
        String url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY"
                + "&symbol=" + symbol
                + "&interval=" + interval
                + "&apikey=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
    public String getDailyTimeSeriesData(String symbol) {
        String url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                + "&symbol=" + symbol
                + "&apikey=" + apiKey;

        return restTemplate.getForObject(url, String.class);
    }


    public String getAllSymbol() {
        String url = "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=" + apiKey;

       return restTemplate.getForObject(url, String.class);

    }
    public List<String> getAllSymbols() {
        String url = "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=" + apiKey;

        String response = restTemplate.getForObject(url, String.class);

        List<String> symbols = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);

            JsonNode statusNode = rootNode.get("data");

            if (statusNode != null) {
                for (Iterator<Map.Entry<String, JsonNode>> it = statusNode.fields(); it.hasNext(); ) {
                    Map.Entry<String, JsonNode> entry = it.next();
                    String symbol = entry.getKey();
                    symbols.add(symbol);
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }

        return symbols;
    }
    public String getNewsSentimentForSymbol(String symbol) {
        String apiUrl = "https://www.alphavantage.co/query"
                + "?function=NEWS_SENTIMENT"
                + "&tickers=" + symbol
                + "&topic=finance"
                + "&limit=10"
                + "&sort=LATEST"
                + "&apikey=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(apiUrl, String.class);
    }
}
