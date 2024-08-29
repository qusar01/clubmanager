package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.entities.ClubEntity;

import java.util.List;
import java.util.Optional;

public interface ClubService {

    ClubEntity save(ClubEntity club);

    List<ClubEntity> findAll();

    Optional<ClubEntity> findById(Long id);

    boolean isExists(Long id);

    ClubEntity partialUpdate(ClubEntity clubEntity);

    void delete(Long id);
}
