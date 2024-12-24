package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.imdb.model.ImdbMedia;

import java.util.List;

public class Season {
    private final String title;
    private final int seasonNumber;
    private final int totalSeasons;
    private final List<Episode> episodes;

    public Season(String title, int seasonNumber, int totalSeasons, List<Episode> episodes) {
        this.title = title;
        this.seasonNumber = seasonNumber;
        this.totalSeasons = totalSeasons;
        this.episodes = episodes;
    }

    public String getTitle() {
        return title;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public int getTotalSeasons() {
        return totalSeasons;
    }

    public List<Episode> getEpisodes() {
        return episodes;
    }

    public int totalEpisodes() {
        return episodes.size();
    }
}
