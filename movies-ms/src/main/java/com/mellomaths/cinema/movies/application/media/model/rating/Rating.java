package com.mellomaths.cinema.movies.application.media.model.rating;

import com.mellomaths.cinema.movies.application.core.utils.math.MathUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class Rating {

    private final List<Review> reviews;

    public Rating() {
        this.reviews = new ArrayList<>();
    }

    private Review newReview(String source, String value) {
        switch (source) {
            case "Internet Movie Database", "IMDB" -> {
                double rating = Double.parseDouble(value.replace("/10", ""));
                return new Review("IMDB", rating);
            }
            case "Rotten Tomatoes" -> {
                double rating = Double.parseDouble(value.replace("%", "")) / 10;
                return new Review("Rotten Tomatoes", rating);
            }
            case "Metacritic", "Metascore" -> {
                double rating = Double.parseDouble(value.replace("/100", "")) / 10;
                return new Review("Metacritic", rating);
            }
        }
        return null;
    }

    public void addReview(String source, String value) {
        Review review = newReview(source, value);
        if (review != null) {
            reviews.add(review);
        }
    }

    private List<Review> uniqueReviews() {
        return Set.copyOf(reviews).stream().toList();
    }

    public double average() {
        double avg = uniqueReviews().stream().mapToDouble(Review::value).average().orElse(0);
        return MathUtils.round(avg, 1);
    }

    public double stars() {
        return Math.round(average() * 2) / 2.0;
    }
}
