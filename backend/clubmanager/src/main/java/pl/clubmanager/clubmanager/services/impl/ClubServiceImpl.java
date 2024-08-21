package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidClubNipException;
import pl.clubmanager.clubmanager.exceptions.InvalidEmailException;
import pl.clubmanager.clubmanager.exceptions.InvalidPhoneNumberException;
import pl.clubmanager.clubmanager.repositories.ClubRepository;
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
    public ClubEntity createClub(ClubEntity club) {
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
}
