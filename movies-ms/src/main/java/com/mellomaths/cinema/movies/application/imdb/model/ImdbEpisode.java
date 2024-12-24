package com.mellomaths.cinema.movies.application.imdb.model;

public record ImdbEpisode(
        String title,
        String released,
        String episode,
        String imdbRating,
        String imdbID
) {
}
