package com.mellomaths.cinema.movies.application.imdb.api;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbResponse;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbSeason;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;

public class ImdbJson {

    private static Gson buildGson() {
        return new GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                .create();
    }

    public static ImdbResponse toResponse(String json) {
        return buildGson().fromJson(json, ImdbResponse.class);
    }

    public static ImdbMedia toMedia(String json) {
        return buildGson().fromJson(json, ImdbMedia.class);
    }

    public static ImdbSeason toSeason(String json) {
        return buildGson().fromJson(json, ImdbSeason.class);
    }
}
