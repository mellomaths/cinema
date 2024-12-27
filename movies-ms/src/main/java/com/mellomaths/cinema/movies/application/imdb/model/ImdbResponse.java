package com.mellomaths.cinema.movies.application.imdb.model;

import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;

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

    public boolean validate() throws ImdbMediaNotFoundException {
        if (isNotFound()) {
            throw new ImdbMediaNotFoundException("not found");
        }
        return isSuccess();
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
