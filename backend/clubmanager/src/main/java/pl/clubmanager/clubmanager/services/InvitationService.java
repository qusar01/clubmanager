package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.dto.InvitationDto;
import pl.clubmanager.clubmanager.domain.entities.InvitationEntity;

import java.util.List;
import java.util.Optional;

public interface InvitationService {

    InvitationEntity save(InvitationEntity invitationEntity);

    InvitationEntity validateToken(String token);

    boolean isExists(Long id);

    void delete(Long id);

    InvitationEntity invite(InvitationDto invitationDto);
}
