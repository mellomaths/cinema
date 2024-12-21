package com.mellomaths.cinema.movies.infra.database.entity;

import com.mellomaths.cinema.movies.application.media.model.rating.Rating;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MediaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private int year;
    private String rated;
    private String released;
    private int runtime;
    // TODO: Figure out how to store commented out columns
    // private String genre;
    // private String director;
    // private String writer;
    // private String actors;
    private String plot;
    private String language;
    private String country;
    private String awards;
    private String poster;
    // private Rating rating;
    private String imdbID;
    private String type;


}
