package com.traderise.traderiseback.configuration;

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.SerializationFeature;


@Configuration
public class JacksonConfiguration {
	@Bean
    public Jackson2ObjectMapperBuilderCustomizer customizer() {
        return builder -> builder
                .featuresToDisable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }
}
