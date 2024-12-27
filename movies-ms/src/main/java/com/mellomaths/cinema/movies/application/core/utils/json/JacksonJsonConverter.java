package com.mellomaths.cinema.movies.application.core.utils.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;

public class JacksonJsonConverter implements JsonConverter {

    private final ObjectMapper mapper;

    public JacksonJsonConverter(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public <T> T toObject(String json, Class<T> clazz) throws JsonConvertionException {
        try {
            return mapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            throw new JsonConvertionException(e);
        }
    }
}
