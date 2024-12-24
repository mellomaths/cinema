package com.mellomaths.cinema.movies.application.imdb.api;

import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbQuery;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbResponse;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ImdbApi {

    private static void validateResponse(ImdbResponse response) throws ImdbMediaNotFoundException {
        if (response.isNotFound()) {
            throw new ImdbMediaNotFoundException("not found");
        }
    }

    public static String get(ImdbQuery imdbQuery) throws ImdbMediaNotFoundException {
        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(imdbQuery.buildUrl()))
                    .build();
            HttpResponse<String> response = client
                    .send(request, HttpResponse.BodyHandlers.ofString());
            validateResponse(ImdbJson.toResponse(response.body()));
            return response.body();
        } catch (IOException | InterruptedException e) {
            return null;
        }
    }
}
