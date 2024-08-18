package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.UserService;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> findAll() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
}
