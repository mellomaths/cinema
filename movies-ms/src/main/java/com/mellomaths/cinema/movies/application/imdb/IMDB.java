package com.mellomaths.cinema.movies.application.imdb;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.mellomaths.cinema.movies.application.imdb.exception.IMDBTitleNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.IMDBTitle;

import java.io.IOException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class IMDB {

    private final String baseUrl;
    private final String apiKey;

    public IMDB(String baseUrl, String apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    private String getBaseUrl() {
        return baseUrl + "/?apikey=" + apiKey;
    }

    private String urlEncoded(String str) {
        return URLEncoder.encode(str, StandardCharsets.UTF_8);
    }

    private IMDBTitle handleResponse(IMDBTitle title) throws IMDBTitleNotFoundException {
        if (title.response().equals("True")) {
            return title;
        }
        if (title.error().contains("not found")) {
            throw new IMDBTitleNotFoundException("Title not found");
        }
        return null;
    }

    private IMDBTitle sendRequestToIMDBApi(String url) throws IMDBTitleNotFoundException {
        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url))
                    .build();
            HttpResponse<String> response = client
                    .send(request, HttpResponse.BodyHandlers.ofString());
            Gson gson = new GsonBuilder()
                    .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                    .create();
            IMDBTitle title = gson.fromJson(response.body(), IMDBTitle.class);
            return handleResponse(title);
        } catch (IOException | InterruptedException | JsonSyntaxException e) {
            return null;
        }
    }

    public IMDBTitle findByTitle(String title) throws IMDBTitleNotFoundException {
        String url = getBaseUrl() + "&t=" + urlEncoded(title) + "&plot=full";
        return sendRequestToIMDBApi(url);
    }

    public IMDBTitle findByTitleAndYear(String title, int year) throws IMDBTitleNotFoundException {
        String url = getBaseUrl() + "&t=" + urlEncoded(title) + "&y=" + year + "&plot=full";
        return sendRequestToIMDBApi(url);
    }

    public IMDBTitle findByImdbId(String imdbId) throws IMDBTitleNotFoundException {
        String url = getBaseUrl() + "&i=" + urlEncoded(imdbId) + "&plot=full";
        return sendRequestToIMDBApi(url);
    }
}
