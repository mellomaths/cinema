package com.mellomaths.cinema.movies.infra.database.repository;

import com.mellomaths.cinema.movies.infra.database.entity.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {
}
