package com.mellomaths.cinema.movies.application.media.service;

import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;
import com.mellomaths.cinema.movies.application.imdb.service.Imdb;
import com.mellomaths.cinema.movies.application.media.model.Media;
import com.mellomaths.cinema.movies.application.media.model.MediaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetMovieByImdbId {

    private final Imdb imdb;

    @Autowired
    public GetMovieByImdbId(Imdb imdb) {
        this.imdb = imdb;
    }

    public Media execute(String imdbId) throws ImdbMediaNotFoundException {
        ImdbMedia imdbMedia = imdb.getMovieByImdbId(imdbId);
        return MediaBuilder.of(imdbMedia);
    }

}
