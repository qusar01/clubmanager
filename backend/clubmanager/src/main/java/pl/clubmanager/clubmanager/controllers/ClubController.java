package pl.clubmanager.clubmanager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.ClubDto;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.ClubService;

import java.util.List;
import java.util.Optional;
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
        ClubEntity savedClubEntity = clubService.save(clubEntity);
        return clubMapper.mapTo(savedClubEntity);
    }

    @GetMapping(path = "/clubs")
    public List<ClubDto> listClubs() {
        List<ClubEntity> clubs = clubService.findAll();
        return clubs.stream().map(clubMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/clubs/{id}")
    public ResponseEntity<ClubDto> getClub(@PathVariable("id") Long id) {
        Optional<ClubEntity> club = clubService.findById(id);
        return club.map(clubEntity -> {
            ClubDto clubDto = clubMapper.mapTo(clubEntity);
            return new ResponseEntity<>(clubDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/clubs/{id}")
    public ResponseEntity<ClubDto> fullUpdateClub(@PathVariable("id") Long id, @RequestBody ClubDto clubDto) {
        if(!clubService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clubDto.setId(id);
        ClubEntity clubEntity = clubMapper.mapFrom(clubDto);
        ClubEntity updatedClubEntity = clubService.save(clubEntity);

        return new ResponseEntity<>(clubMapper.mapTo(updatedClubEntity), HttpStatus.OK);
    }

    @PatchMapping(path = "/clubs/{id}")
    public ResponseEntity<ClubDto> partialUpdateClub(@PathVariable("id") Long id, @RequestBody ClubDto clubDto) {
        if(!clubService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clubDto.setId(id);
        ClubEntity clubEntity = clubMapper.mapFrom(clubDto);
        ClubEntity updatedClubEntity = clubService.partialUpdate(clubEntity);

        return new ResponseEntity<>(clubMapper.mapTo(updatedClubEntity), HttpStatus.OK);
    }

    @DeleteMapping(path = "/clubs/{id}")
    public ResponseEntity<ClubDto> deleteClub(@PathVariable("id") Long id) {
        if(!clubService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        clubService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
