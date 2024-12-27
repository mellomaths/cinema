package com.mellomaths.cinema.movies.application.imdb.model;

import com.mellomaths.cinema.movies.application.core.utils.url.UrlUtils;

public class ImdbQuery {

    private final String baseUrl;
    private final String apiKey;
    private String imdbId;
    private String title;
    private int year;
    private boolean fullPlot;
    private int season;
    private ImdbTitleType type;

    public ImdbQuery(String baseUrl, String apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public ImdbQuery withImdbId(String imdbId) {
        this.imdbId = imdbId;
        return this;
    }

    public ImdbQuery withTitle(String title) {
        this.title = UrlUtils.encode(title);
        return this;
    }

    public ImdbQuery withYear(int year) {
        this.year = year;
        return this;
    }

    public ImdbQuery withFullPlot(boolean fullPlot) {
        this.fullPlot = fullPlot;
        return this;
    }

    public ImdbQuery withSeason(int season) {
        this.season = season;
        return this;
    }

    public ImdbQuery withType(ImdbTitleType type) {
        this.type = type;
        return this;
    }

    public String buildUrl() {
        String url = baseUrl + "/?apikey=" + apiKey;
        if (imdbId != null) {
            url += "&i=" + imdbId;
        }
        if (title != null) {
            url += "&t=" + title;
        }
        if (year != 0) {
            url += "&y=" + year;
        }
        if (fullPlot) {
            url += "&plot=full";
        }
        if (season != 0) {
            url += "&Season=" + season;
        }
        if (type != null) {
            url += "&type=" + type.getValue();
        }
        return url;
    }
}
