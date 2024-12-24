package com.mellomaths.cinema.movies.application.imdb.model;

public class ImdbResponse {

    private final String response;
    private final String error;

    public ImdbResponse(String response, String error) {
        this.response = response;
        this.error = error;
    }

    public static ImdbResponse of(ImdbMedia imdbMedia) {
        return new ImdbResponse(imdbMedia.getResponse(), imdbMedia.getError());
    }

    public static ImdbResponse of(ImdbSeason imdbSeason) {
        return new ImdbResponse(imdbSeason.getResponse(), imdbSeason.getError());
    }

    public boolean isSuccess() {
        if (response == null) return false;
        return response.equals("True");
    }

    public boolean isNotFound() {
        if (error == null) return false;
        return error.contains("not found");
    }
}
