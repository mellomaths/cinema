package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.media.model.rating.Rating;

public class Media {

    private final String title;
    private final int year;
    private final String rated;
    private final String released;
    private final int runtime;
    private final String genre;
    private final String director;
    private final String writer;
    private final String actors;
    private final String plot;
    private final String language;
    private final String country;
    private final String awards;
    private final String poster;
    private final Rating rating;
    private final String imdbID;
    private final String type;

    protected Media(
            String title, int year, String rated, String released, int runtime, String genre, String director,
            String writer, String actors, String plot, String language, String country, String awards, String poster,
            Rating rating, String imdbID, String type) {
        this.title = title;
        this.year = year;
        this.rated = rated;
        this.released = released;
        this.runtime = runtime;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.actors = actors;
        this.plot = plot;
        this.language = language;
        this.country = country;
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

    public String getGenre() {
        return genre;
    }

    public String getDirector() {
        return director;
    }

    public String getWriter() {
        return writer;
    }

    public String getActors() {
        return actors;
    }

    public String getPlot() {
        return plot;
    }

    public String getLanguage() {
        return language;
    }

    public String getCountry() {
        return country;
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

}
