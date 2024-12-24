package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;
import com.mellomaths.cinema.movies.application.media.model.rating.Rating;
import com.mellomaths.cinema.movies.infra.logging.json.JSONFileLogger;

import java.util.Arrays;
import java.util.List;

public class MediaBuilder {
    private static final JSONFileLogger logger = new JSONFileLogger("media.json");

    String title;
    int year;
    String rated;
    String released;
    int runtime;
    List<Genre> genre;
    List<Artist> director;
    List<Artist> writer;
    List<Artist> actors;
    String plot;
    List<Language> language;
    List<Country> country;
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

    public MediaBuilder genres(List<Genre> genre) {
        this.genre = genre;
        return this;
    }

    public MediaBuilder directors(List<Artist> director) {
        this.director = director;
        return this;
    }

    public MediaBuilder writers(List<Artist> writer) {
        this.writer = writer;
        return this;
    }

    public MediaBuilder actors(List<Artist> actors) {
        this.actors = actors;
        return this;
    }

    public MediaBuilder plot(String plot) {
        this.plot = plot;
        return this;
    }

    public MediaBuilder languages(List<Language> language) {
        this.language = language;
        return this;
    }

    public MediaBuilder countries(List<Country> country) {
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

    public static Media of(ImdbMedia imdbMedia) {
        Rating rating = new Rating();
        Arrays.stream(imdbMedia.getRatings())
                .forEach(r -> rating.addReview(r.source(), r.value()));
        rating.addReview("IMDB", imdbMedia.getImdbRating());
        rating.addReview("Metascore", imdbMedia.getMetascore());
        var media = new MediaBuilder(imdbMedia.getImdbID(), imdbMedia.getTitle(), Integer.parseInt(imdbMedia.getYear()), imdbMedia.getType())
                .rated(imdbMedia.getRated())
                .released(imdbMedia.getReleased())
                .runtime(Integer.parseInt(imdbMedia.getRuntime().split(" ")[0]))
                .genres(Arrays.stream(imdbMedia.getGenre().split(",")).map(String::trim).map(Genre::new).toList())
                .directors(Arrays.stream(imdbMedia.getDirector().split(",")).map(String::trim).map(Artist::new).toList())
                .writers(Arrays.stream(imdbMedia.getWriter().split(",")).map(String::trim).map(Artist::new).toList())
                .actors(Arrays.stream(imdbMedia.getActors().split(",")).map(String::trim).map(Artist::new).toList())
                .plot(imdbMedia.getPlot())
                .languages(Arrays.stream(imdbMedia.getLanguage().split(",")).map(String::trim).map(Language::new).toList())
                .countries(Arrays.stream(imdbMedia.getCountry().split(",")).map(String::trim).map(Country::new).toList())
                .awards(imdbMedia.getAwards())
                .poster(imdbMedia.getPoster())
                .rating(rating)
                .build();
        logger.log(media);
        return media;
    }
}
