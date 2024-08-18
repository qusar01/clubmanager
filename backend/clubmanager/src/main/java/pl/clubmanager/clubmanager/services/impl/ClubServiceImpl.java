package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.repositories.ClubRepository;
import pl.clubmanager.clubmanager.services.ClubService;

import java.util.List;
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
        return clubRepository.save(club);
    }

    @Override
    public List<ClubEntity> findAll() {
        return StreamSupport.stream(clubRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
}
