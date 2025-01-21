package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.dto.ClubRankingDto;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.List;
import java.util.Optional;

public interface ClubService {

    ClubEntity save(ClubEntity club);

    List<ClubEntity> findAll();

    Optional<ClubEntity> findById(Long id);

    boolean isExists(Long id);

    ClubEntity partialUpdate(ClubEntity clubEntity);

    void delete(Long id);

    Optional<ClubEntity> findByUserId(Long userId);

    List<UserEntity> findUsersByClubId(Long clubId);
    List<UserEntity> addMember(Long clubId, Long id);

    List<UserEntity> removeMember(Long id);

    List<ClubRankingDto> getRankingForClub(Long clubId);
}
