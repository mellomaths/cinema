package com.mellomaths.cinema.movies.application.imdb.model;

public class ImdbSeason {
    private String Title;
    private String Season;
    private String totalSeasons;
    private ImdbEpisode[] Episodes;
    private String response;
    private String error;

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getSeason() {
        return Season;
    }

    public void setSeason(String season) {
        Season = season;
    }

    public String getTotalSeasons() {
        return totalSeasons;
    }

    public void setTotalSeasons(String totalSeasons) {
        this.totalSeasons = totalSeasons;
    }

    public ImdbEpisode[] getEpisodes() {
        return Episodes;
    }

    public void setEpisodes(ImdbEpisode[] episodes) {
        Episodes = episodes;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
