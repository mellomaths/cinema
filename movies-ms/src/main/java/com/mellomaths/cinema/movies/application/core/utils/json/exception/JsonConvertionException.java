package com.mellomaths.cinema.movies.application.core.utils.json.exception;

public class JsonConvertionException extends Exception {
    public JsonConvertionException(String message) {
        super(message);
    }

    public JsonConvertionException(Exception e) {
        super(e);
    }
}
