package com.mellomaths.cinema.movies.application.core.utils.json;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;

public class GsonJsonConverter implements JsonConverter {

    private final Gson instance;

    public GsonJsonConverter(Gson instance) {
        this.instance = new Gson();
    }

    @Override
    public <T> T toObject(String json, Class<T> clazz) throws JsonConvertionException {
        try {
            return instance.fromJson(json, clazz);
        } catch (JsonSyntaxException e) {
            throw new JsonConvertionException(e);
        }
    }
}
