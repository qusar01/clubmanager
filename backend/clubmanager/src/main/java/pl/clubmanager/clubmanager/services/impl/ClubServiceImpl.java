package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidClubNipException;
import pl.clubmanager.clubmanager.exceptions.InvalidEmailException;
import pl.clubmanager.clubmanager.exceptions.InvalidPhoneNumberException;
import pl.clubmanager.clubmanager.repositories.ClubRepository;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.ClubService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ClubServiceImpl implements ClubService {

    private ClubRepository clubRepository;

    public ClubServiceImpl(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }
    @Override
    public ClubEntity save(ClubEntity club) {
        clubRepository.findByClubNip(club.getClubNip())
                .ifPresent(club1 -> {
                    throw new InvalidClubNipException("Klub o podanym NIP już istnieje");
                });
        clubRepository.findByPhoneNumber(club.getPhoneNumber())
                .ifPresent(club1 -> {
                    throw new InvalidPhoneNumberException("Klub o podanym numerze telefonu już istnieje");
                });

        return clubRepository.save(club);
    }

    @Override
    public List<ClubEntity> findAll() {
        return StreamSupport.stream(clubRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ClubEntity> findById(Long id) {
        return clubRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return clubRepository.existsById(id);
    }

    @Override
    public ClubEntity partialUpdate(ClubEntity clubEntity) {
        return clubRepository.findById(clubEntity.getId()).map(existingClub -> {
            Optional.ofNullable(clubEntity.getClubName()).ifPresent(existingClub::setClubName);
            Optional.ofNullable(clubEntity.getClubNip()).ifPresent(existingClub::setClubNip);
            Optional.ofNullable(clubEntity.getPhoneNumber()).ifPresent(existingClub::setPhoneNumber);
            return clubRepository.save(existingClub);
        }).orElseThrow(() -> new RuntimeException("Club not found"));
    }

    @Override
    public void delete(Long id) {
        clubRepository.deleteById(id);
    }
}
