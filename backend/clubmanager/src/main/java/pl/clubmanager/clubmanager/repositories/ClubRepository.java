package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;

@Repository
public interface ClubRepository extends CrudRepository<ClubEntity, Long> {
}
