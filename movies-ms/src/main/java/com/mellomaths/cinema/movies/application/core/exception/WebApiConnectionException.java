package com.mellomaths.cinema.movies.application.core.exception;

import java.io.IOException;

public class WebApiConnectionException extends Exception {
    public WebApiConnectionException(String message) {
        super(message);
    }

    public WebApiConnectionException(Exception e) {
        super(e);
    }
}
