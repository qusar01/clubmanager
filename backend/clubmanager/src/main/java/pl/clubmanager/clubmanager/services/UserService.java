package pl.clubmanager.clubmanager.services;


import pl.clubmanager.clubmanager.domain.dto.ClubRankingDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserEntity save(UserEntity user);

    List<UserEntity> findAll();

    Optional<UserEntity> findById(Long id);

    boolean isExists(Long id);

    UserEntity partialUpdate(Long id, UserEntity userEntity);

    void delete(Long id);
}
