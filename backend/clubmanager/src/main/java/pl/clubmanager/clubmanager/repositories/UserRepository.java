package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long>{
}
