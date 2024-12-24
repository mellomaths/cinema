package com.mellomaths.cinema.movies.application.imdb.model;

public enum ImdbTitleType {
    MOVIE("movie"),
    SERIES("series"),
    EPISODE("episode");

    private final String value;

    ImdbTitleType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
