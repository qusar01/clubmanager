package pl.clubmanager.clubmanager.services;


import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity createUser(UserEntity user);

    List<UserEntity> findAll();
}
