package com.traderise.traderiseback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.traderise.traderiseback") 
public class TradeRiseBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(TradeRiseBackApplication.class, args);
    }

}
