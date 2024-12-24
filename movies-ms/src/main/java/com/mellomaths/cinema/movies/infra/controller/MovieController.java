package com.mellomaths.cinema.movies.infra.controller;

import com.mellomaths.cinema.movies.application.imdb.exception.ImdbMediaNotFoundException;
import com.mellomaths.cinema.movies.application.media.model.Media;
import com.mellomaths.cinema.movies.application.media.service.GetMovieByImdbId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/movies")
public class MovieController {

    private final GetMovieByImdbId getMovieByImdbId;

    @Autowired
    public MovieController(GetMovieByImdbId getMovieByImdbId) {
        this.getMovieByImdbId = getMovieByImdbId;
    }

    @GetMapping("/{imdbId}")
    public Media getMedia(@PathVariable("imdbId") String imdbId) throws ImdbMediaNotFoundException {
        return this.getMovieByImdbId.execute(imdbId);
    }
}
