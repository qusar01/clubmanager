package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.entities.ClubEntity;

import java.util.List;

public interface ClubService {

    ClubEntity createClub(ClubEntity club);

    List<ClubEntity> findAll();
}
