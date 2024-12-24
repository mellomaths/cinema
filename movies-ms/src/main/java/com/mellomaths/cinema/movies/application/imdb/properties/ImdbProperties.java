package com.mellomaths.cinema.movies.application.imdb.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "imdb.api")
public class ImdbProperties {

    private String baseUrl;
    private String key;

    public ImdbProperties(String baseUrl, String key) {
        this.baseUrl = baseUrl;
        this.key = key;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getKey() {
        return key;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
