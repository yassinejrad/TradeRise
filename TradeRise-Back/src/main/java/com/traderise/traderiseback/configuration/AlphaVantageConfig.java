package com.traderise.traderiseback.configuration;

import com.traderise.traderiseback.service.AlphaVantageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AlphaVantageConfig {
    @Value("${alphaVantage.apiKey}")
    private String apiKey;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public AlphaVantageService alphaVantageService() {
        return new AlphaVantageService(apiKey);
    }
}
