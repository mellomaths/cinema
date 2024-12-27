package com.mellomaths.cinema.movies.application.imdb.service;

import com.mellomaths.cinema.movies.application.core.exception.WebApiConnectionException;
import com.mellomaths.cinema.movies.application.core.utils.json.exception.JsonConvertionException;
import com.mellomaths.cinema.movies.application.imdb.api.ImdbApi;
import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.*;
import com.mellomaths.cinema.movies.application.imdb.properties.ImdbProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Imdb {

    private final ImdbProperties properties;
    private final ImdbApi imdbApi = new ImdbApi();

    @Autowired
    public Imdb(ImdbProperties properties) {
        this.properties = properties;
    }

    public ImdbMedia getMovieByTitle(String title) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withType(ImdbTitleType.MOVIE);
        return imdbApi.getMedia(query);
    }

    public ImdbMedia getMovieByTitleAndYear(String title, int year) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withYear(year)
                .withType(ImdbTitleType.MOVIE);
        return imdbApi.getMedia(query);
    }

    public ImdbMedia getMovieByImdbId(String imdbId) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId)
                .withType(ImdbTitleType.MOVIE);
        return imdbApi.getMedia(query);
    }

    public ImdbSeason getSeasonByTitleAndSeason(String title, int seasonNumber) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        return imdbApi.getSeason(query);
    }

    public ImdbSeason getSeasonByImdbIdAndSeason(String imdbId, int seasonNumber) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        return imdbApi.getSeason(query);
    }

    public ImdbMedia getEpisodeByImdbIdAndSeasonAndEpisode(String imdbId, int seasonNumber, int episodeNumber) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withImdbId(imdbId).withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        return imdbApi.getMedia(query);
    }

    public ImdbMedia getEpisodeByTitleAndSeasonAndEpisode(String title, int seasonNumber, int episodeNumber) throws ImdbMediaNotFoundException, WebApiConnectionException, JsonConvertionException {
        ImdbQuery query = new ImdbQuery(properties.getBaseUrl(), properties.getKey())
                .withTitle(title)
                .withSeason(seasonNumber)
                .withType(ImdbTitleType.SERIES);
        return imdbApi.getMedia(query);
    }
}
