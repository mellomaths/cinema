package com.mellomaths.cinema.movies.application.media.model;

import com.google.gson.Gson;
import com.mellomaths.cinema.movies.application.media.model.rating.Rating;
import com.mellomaths.cinema.movies.infra.logging.json.WritableJson;

import java.util.List;

public class Media implements WritableJson {

    private final String title;
    private final int year;
    private final String rated;
    private final String released;
    private final int runtime;
    private final List<Genre> genres;
    private final List<Artist> directors;
    private final List<Artist> writers;
    private final List<Artist> actors;
    private final String plot;
    private final List<Language> languages;
    private final List<Country> countries;
    private final String awards;
    private final String poster;
    private final Rating rating;
    private final String imdbID;
    private final String type;

    protected Media(
            String title, int year, String rated, String released, int runtime, List<Genre> genres, List<Artist> directors,
            List<Artist> writers, List<Artist> actors, String plot, List<Language> languages, List<Country> countries, String awards, String poster,
            Rating rating, String imdbID, String type) {
        this.title = title;
        this.year = year;
        this.rated = rated;
        this.released = released;
        this.runtime = runtime;
        this.genres = genres;
        this.directors = directors;
        this.writers = writers;
        this.actors = actors;
        this.plot = plot;
        this.languages = languages;
        this.countries = countries;
        this.awards = awards;
        this.poster = poster;
        this.rating = rating;
        this.imdbID = imdbID;
        this.type = type;
    }

    protected Media(MediaBuilder builder) {
        this(builder.title, builder.year, builder.rated, builder.released, builder.runtime, builder.genre, builder.director,
                builder.writer, builder.actors, builder.plot, builder.language, builder.country, builder.awards, builder.poster,
                builder.rating, builder.imdbID, builder.type);
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }

    public String getRated() {
        return rated;
    }

    public String getReleased() {
        return released;
    }

    public int getRuntime() {
        return runtime;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public List<Artist> getDirectors() {
        return directors;
    }

    public List<Artist> getWriters() {
        return writers;
    }

    public List<Artist> getActors() {
        return actors;
    }

    public String getPlot() {
        return plot;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public List<Country> getCountries() {
        return countries;
    }

    public String getAwards() {
        return awards;
    }

    public String getPoster() {
        return poster;
    }

    public double getAverageRating() {
        return rating.average();
    }

    public String getImdbID() {
        return imdbID;
    }

    public String getType() {
        return type;
    }

    public String runtimeInHoursAndMinutes() {
        int hours = runtime / 60;
        int minutes = runtime % 60;
        return hours + "h " + minutes + "min";
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

}
