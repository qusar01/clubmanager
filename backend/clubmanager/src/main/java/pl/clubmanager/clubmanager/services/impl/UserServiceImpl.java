package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.dto.ClubRankingDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidBirthDateException;
import pl.clubmanager.clubmanager.exceptions.InvalidFirstNameException;
import pl.clubmanager.clubmanager.exceptions.InvalidLastNameException;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.UserService;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> findAll() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserEntity> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public UserEntity partialUpdate(Long id, UserEntity userEntity) {
        return userRepository.findById(id).map(existingUser -> {
            Optional.ofNullable(userEntity.getFirstName()).ifPresent(firstName -> {
                if (firstName.length() < 2 || firstName.length() > 50) {
                    throw new InvalidFirstNameException("Niepoprawne imię");
                }
                existingUser.setFirstName(firstName);
            });
            Optional.ofNullable(userEntity.getLastName()).ifPresent(lastName -> {
                if (lastName.length() < 2 || lastName.length() > 50) {
                    throw new InvalidLastNameException("Niepoprawne nazwisko");
                }
                existingUser.setLastName(lastName);
            });
            Optional.ofNullable(userEntity.getBirthDate()).ifPresent(birthDate -> {
                if (birthDate.isAfter(LocalDate.now()) || birthDate.isBefore(LocalDate.of(1900, 1, 1))) {
                    throw new InvalidBirthDateException("Niepoprawna data.");
                }
                existingUser.setBirthDate(birthDate);
            });
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<ClubRankingDto> getRankingForClub(Long clubId) {

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date start = calendar.getTime();

        calendar.add(Calendar.MONTH, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date end = calendar.getTime();

        List<Object[]> results = userRepository.getRankingForClub(clubId, start, end);

        List<ClubRankingDto> ranking = new ArrayList<>();
        for (Object[] row : results) {
            Long memberId = (Long) row[0];
            String firstName = (String) row[1];
            String lastName = (String) row[2];
            Long attendanceCount = (Long) row[3];
            ranking.add(new ClubRankingDto(memberId, firstName, lastName, attendanceCount));
        }
        return ranking;
    }
}
