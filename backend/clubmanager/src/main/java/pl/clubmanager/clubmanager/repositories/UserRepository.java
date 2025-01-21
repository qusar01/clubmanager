package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long>{

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByVerificationCode(String verificationCode);

}
