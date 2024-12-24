package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.imdb.model.ImdbSeason;

import java.util.Arrays;
import java.util.List;

public class SeasonBuilder {

    String title;
    int seasonNumber;
    int totalSeasons;
    List<Episode> episodes;

    public SeasonBuilder(String title, int seasonNumber) {
        this.title = title;
        this.seasonNumber = seasonNumber;
    }

    public SeasonBuilder withTotalSeasons(int totalSeasons) {
        this.totalSeasons = totalSeasons;
        return this;
    }

    public SeasonBuilder withEpisodes(List<Episode> episodes) {
        this.episodes = episodes;
        return this;
    }

    public Season build() {
        return new Season(title, seasonNumber, totalSeasons, episodes);
    }

    public static Season of(ImdbSeason imdbSeason) {
        int seasonNumber = Integer.parseInt(imdbSeason.getSeason());
        List<Episode> episodes = Arrays
                .stream(imdbSeason.getEpisodes())
                .map(episode -> EpisodeBuilder.of(
                        episode, seasonNumber))
                .toList();
        return new SeasonBuilder(imdbSeason.getTitle(), seasonNumber)
                .withTotalSeasons(Integer.parseInt(imdbSeason.getTotalSeasons()))
                .withEpisodes(episodes)
                .build();
    }
}
