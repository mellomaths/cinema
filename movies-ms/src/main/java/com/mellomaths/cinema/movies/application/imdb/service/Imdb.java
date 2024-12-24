package com.mellomaths.cinema.movies.application.imdb.service;

import com.mellomaths.cinema.movies.application.imdb.api.ImdbApi;
import com.mellomaths.cinema.movies.application.imdb.api.ImdbJson;
import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.*;
import com.mellomaths.cinema.movies.application.imdb.properties.ImdbProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Imdb {

    private final ImdbProperties properties;

    @Autowired
    public Imdb(ImdbProperties properties) {
        this.properties = properties;
    }

    public ImdbMedia getMovieByTitle(String title) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withType(ImdbTitleType.MOVIE);
        String json = ImdbApi.get(query);
        return ImdbJson.toMedia(json);
    }

    public ImdbMedia getMovieByTitleAndYear(String title, int year) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withYear(year)
                .withType(ImdbTitleType.MOVIE);
        String json = ImdbApi.get(query);
        return ImdbJson.toMedia(json);
    }

    public ImdbMedia getMovieByImdbId(String imdbId) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId)
                .withType(ImdbTitleType.MOVIE);
        String json = ImdbApi.get(query);
        return ImdbJson.toMedia(json);
    }

    public ImdbSeason getSeasonByTitleAndSeason(String title, int seasonNumber) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        String json = ImdbApi.get(query);
        return ImdbJson.toSeason(json);
    }

    public ImdbSeason getSeasonByImdbIdAndSeason(String imdbId, int seasonNumber) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        String json = ImdbApi.get(query);
        return ImdbJson.toSeason(json);
    }

    public ImdbMedia getEpisodeByImdbIdAndSeasonAndEpisode(String imdbId, int seasonNumber, int episodeNumber) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId).withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        String json = ImdbApi.get(query);
        return ImdbJson.toMedia(json);
    }

    public ImdbMedia getEpisodeByTitleAndSeasonAndEpisode(String title, int seasonNumber, int episodeNumber) throws ImdbMediaNotFoundException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        String json = ImdbApi.get(query);
        return ImdbJson.toMedia(json);
    }
}
