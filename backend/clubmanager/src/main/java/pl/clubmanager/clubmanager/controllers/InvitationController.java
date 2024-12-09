package pl.clubmanager.clubmanager.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.ClubDto;
import pl.clubmanager.clubmanager.domain.dto.InvitationDto;
import pl.clubmanager.clubmanager.domain.entities.InvitationEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.InvitationService;


@RequestMapping("/invitations")
@RestController
public class InvitationController {

    private InvitationService invitationService;

    private Mapper<InvitationEntity, InvitationDto> invitationMapper;

    public InvitationController(InvitationService invitationService, Mapper<InvitationEntity, InvitationDto> invitationMapper) {
        this.invitationService = invitationService;
        this.invitationMapper = invitationMapper;
    }

    @PostMapping
    public ResponseEntity<InvitationDto> inviteMember(@Valid @RequestBody InvitationDto invitation) {
        InvitationEntity invitationEntity = invitationService.invite(invitation);
        return new ResponseEntity<>(invitationMapper.mapTo(invitationEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/validate")
    public ResponseEntity<InvitationDto> validateToken(@RequestParam String token) {
        InvitationEntity invitationEntity = invitationService.validateToken(token);
        return new ResponseEntity<>(invitationMapper.mapTo(invitationEntity), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<InvitationDto> deleteInvitation(@PathVariable("id") Long id) {
        if(!invitationService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        invitationService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
