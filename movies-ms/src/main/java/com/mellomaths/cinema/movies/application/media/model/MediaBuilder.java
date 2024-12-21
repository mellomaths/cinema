package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.imdb.model.IMDBTitle;
import com.mellomaths.cinema.movies.application.media.model.rating.Rating;

import java.util.Arrays;

public class MediaBuilder {
    String title;
    int year;
    String rated;
    String released;
    int runtime;
    String genre;
    String director;
    String writer;
    String actors;
    String plot;
    String language;
    String country;
    String awards;
    String poster;
    Rating rating;
    String imdbID;
    String type;

    public MediaBuilder(String imdbID, String title, int year, String type) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
    }

    public MediaBuilder rated(String rated) {
        this.rated = rated;
        return this;
    }

    public MediaBuilder released(String released) {
        this.released = released;
        return this;
    }

    public MediaBuilder runtime(int runtime) {
        this.runtime = runtime;
        return this;
    }

    public MediaBuilder genre(String genre) {
        this.genre = genre;
        return this;
    }

    public MediaBuilder director(String director) {
        this.director = director;
        return this;
    }

    public MediaBuilder writer(String writer) {
        this.writer = writer;
        return this;
    }

    public MediaBuilder actors(String actors) {
        this.actors = actors;
        return this;
    }

    public MediaBuilder plot(String plot) {
        this.plot = plot;
        return this;
    }

    public MediaBuilder language(String language) {
        this.language = language;
        return this;
    }

    public MediaBuilder country(String country) {
        this.country = country;
        return this;
    }

    public MediaBuilder awards(String awards) {
        this.awards = awards;
        return this;
    }

    public MediaBuilder poster(String poster) {
        this.poster = poster;
        return this;
    }

    public MediaBuilder rating(Rating rating) {
        this.rating = rating;
        return this;
    }

    public Media build() {
        return new Media(this);
    }

    public static Media of(IMDBTitle imdbTitle) {
        Rating rating = new Rating();
        Arrays.stream(imdbTitle.ratings())
                .forEach(r -> rating.addReview(r.source(), r.value()));
        rating.addReview("IMDB", imdbTitle.imdbRating());
        rating.addReview("Metascore", imdbTitle.metascore());
        return new MediaBuilder(imdbTitle.imdbID(), imdbTitle.title(), Integer.parseInt(imdbTitle.year()), imdbTitle.type())
                .rated(imdbTitle.rated())
                .released(imdbTitle.released())
                .runtime(Integer.parseInt(imdbTitle.runtime().split(" ")[0]))
                .genre(imdbTitle.genre())
                .director(imdbTitle.director())
                .writer(imdbTitle.writer())
                .actors(imdbTitle.actors())
                .plot(imdbTitle.plot())
                .language(imdbTitle.language())
                .country(imdbTitle.country())
                .awards(imdbTitle.awards())
                .poster(imdbTitle.poster())
                .rating(rating)
                .build();
    }
}
