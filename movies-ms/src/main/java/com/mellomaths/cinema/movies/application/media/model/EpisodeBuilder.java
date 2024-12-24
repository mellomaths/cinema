package com.mellomaths.cinema.movies.application.media.model;

import com.mellomaths.cinema.movies.application.imdb.model.ImdbEpisode;
import com.mellomaths.cinema.movies.application.media.model.rating.Rating;

public class EpisodeBuilder {

        String title;
        String releasedAt;
        int episodeNumber;
        int seasonNumber;
        Rating rating;
        String imdbID;

        public EpisodeBuilder(String title, int episodeNumber, int seasonNumber) {
            this.title = title;
            this.episodeNumber = episodeNumber;
            this.seasonNumber = seasonNumber;
        }

        public EpisodeBuilder releasedAt(String releasedAt) {
            this.releasedAt = releasedAt;
            return this;
        }

        public EpisodeBuilder rating(Rating rating) {
            this.rating = rating;
            return this;
        }

        public EpisodeBuilder imdbID(String imdbID) {
            this.imdbID = imdbID;
            return this;
        }

        public Episode build() {
            return new Episode(title, releasedAt, episodeNumber, seasonNumber, rating, imdbID);
        }

        public static Episode of(ImdbEpisode imdbEpisode, int seasonNumber) {
            Rating rating = new Rating();
            if (imdbEpisode.imdbRating() != null) rating.addReview("IMDB", imdbEpisode.imdbRating());
            return new EpisodeBuilder(imdbEpisode.title(), Integer.parseInt(imdbEpisode.episode()), seasonNumber)
                    .releasedAt(imdbEpisode.released())
                    .rating(rating)
                    .imdbID(imdbEpisode.imdbID())
                    .build();
        }
}
