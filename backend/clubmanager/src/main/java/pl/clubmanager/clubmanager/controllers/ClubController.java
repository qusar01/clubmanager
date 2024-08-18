package pl.clubmanager.clubmanager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.clubmanager.clubmanager.domain.dto.ClubDto;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.ClubService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ClubController {

    private ClubService clubService;

    private Mapper<ClubEntity, ClubDto> clubMapper;

    public ClubController(ClubService clubService, Mapper<ClubEntity, ClubDto> clubMapper) {
        this.clubService = clubService;
        this.clubMapper = clubMapper;
    }

    @PostMapping(path = "/clubs")
    public ClubDto createClub(@RequestBody ClubDto club) {
        ClubEntity clubEntity = clubMapper.mapFrom(club);
        ClubEntity savedClubEntity = clubService.createClub(clubEntity);
        return clubMapper.mapTo(savedClubEntity);
    }

    @GetMapping(path = "/clubs")
    public List<ClubDto> listClubs() {
        List<ClubEntity> clubs = clubService.findAll();
        return clubs.stream().map(clubMapper::mapTo).collect(Collectors.toList());
    }
}
