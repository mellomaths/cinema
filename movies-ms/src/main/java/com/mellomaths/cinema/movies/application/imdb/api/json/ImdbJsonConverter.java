package com.mellomaths.cinema.movies.application.imdb.api.json;

import com.mellomaths.cinema.movies.application.core.utils.json.GsonJsonConverter;
import com.mellomaths.cinema.movies.application.core.utils.json.JsonConverter;
import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbResponse;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbSeason;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;

public class ImdbJsonConverter {

    private JsonConverter converter;

    public ImdbJsonConverter() {
        this.converter = new GsonJsonConverter(ImdbGson.build());
    }

    public ImdbResponse toResponse(String json) throws JsonConvertionException {
        return converter.toObject(json, ImdbResponse.class);
    }

    public ImdbMedia toMedia(String json) throws JsonConvertionException {
        return converter.toObject(json, ImdbMedia.class);
    }

    public ImdbSeason toSeason(String json) throws JsonConvertionException {
        return converter.toObject(json, ImdbSeason.class);
    }
}
