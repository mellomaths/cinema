package com.mellomaths.cinema.movies.application.imdb.api;

import com.mellomaths.cinema.movies.application.core.exception.WebApiConnectionException;
import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;
import com.mellomaths.cinema.movies.application.imdb.api.json.ImdbJsonConverter;
import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbQuery;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbResponse;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbSeason;
import com.mellomaths.cinema.movies.infra.service.WebApi;

public class ImdbApi {

    private final ImdbJsonConverter jsonConverter;

    public ImdbApi() {
        this.jsonConverter = new ImdbJsonConverter();
    }

    public ImdbMedia getMedia(ImdbQuery imdbQuery) throws WebApiConnectionException, ImdbMediaNotFoundException, JsonConvertionException {
        String json = WebApi.get(imdbQuery.buildUrl());
        ImdbResponse response = jsonConverter.toResponse(json);
        response.validate();
        return jsonConverter.toMedia(json);
    }

    public ImdbSeason getSeason(ImdbQuery imdbQuery) throws WebApiConnectionException, ImdbMediaNotFoundException, JsonConvertionException {
        String json = WebApi.get(imdbQuery.buildUrl());
        ImdbResponse response = jsonConverter.toResponse(json);
        response.validate();
        return jsonConverter.toSeason(json);
    }
}
