package com.mellomaths.cinema.movies.application.core.utils.json;

import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;

public interface JsonConverter {
    <T> T toObject(String json, Class<T> clazz) throws JsonConvertionException;
}
