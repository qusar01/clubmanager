package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.InvitationEntity;

import java.util.Optional;

@Repository
public interface InvitationRepository extends CrudRepository<InvitationEntity, Long> {

    Optional<InvitationEntity> findByEmail(String email);

    Optional<InvitationEntity> findByToken(String token);
}
