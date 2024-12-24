package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.media.model.rating.Rating;

public class Episode {
    private final String title;
    private final String releasedAt;
    private final int episodeNumber;
    private final int seasonNumber;
    private final Rating rating;
    private final String imdbID;

    public Episode(String title, String releasedAt, int episodeNumber, int seasonNumber, Rating rating, String imdbID) {
        this.title = title;
        this.releasedAt = releasedAt;
        this.episodeNumber = episodeNumber;
        this.seasonNumber = seasonNumber;
        this.rating = rating;
        this.imdbID = imdbID;
    }

    public String getTitle() {
        return title;
    }

    public String getReleasedAt() {
        return releasedAt;
    }

    public int getEpisodeNumber() {
        return episodeNumber;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public Rating getRating() {
        return rating;
    }

    public String getImdbID() {
        return imdbID;
    }

}
