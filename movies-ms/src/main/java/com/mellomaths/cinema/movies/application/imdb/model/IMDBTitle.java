package com.mellomaths.cinema.movies.application.imdb.model;

import com.google.gson.annotations.SerializedName;

public record IMDBTitle(
        String title,
        String year,
        String rated,
        String released,
        String runtime,
        String genre,
        String director,
        String writer,
        String actors,
        String plot,
        String language,
        String country,
        String awards,
        String poster,
        IMDBRating[] ratings,
        String metascore,
        // Needed to be able to deserialize the fields not UpperCamelCase
        @SerializedName("imdbRating") String imdbRating,
        @SerializedName("imdbVotes") String imdbVotes,
        @SerializedName("imdbID") String imdbID,
        String type,
        @SerializedName("totalSeasons") String totalSeasons,
        String dvd,
        String boxOffice,
        String production,
        String website,
        String response,
        String error
) {}
