package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;

import java.util.Optional;

@Repository
public interface ClubRepository extends CrudRepository<ClubEntity, Long> {

    Optional<ClubEntity> findByClubNip(String nip);

    Optional<ClubEntity> findByPhoneNumber(String phoneNumber);
}
