package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends CrudRepository<ClubEntity, Long> {

    Optional<ClubEntity> findByClubNip(String nip);

    Optional<ClubEntity> findByPhoneNumber(String phoneNumber);

    @Query("SELECT c FROM ClubEntity c JOIN c.users u WHERE u.id = :userId")
    Optional<ClubEntity> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c.users FROM ClubEntity c WHERE c.id = :clubId")
    List<UserEntity> findUsersByClubId(@Param("clubId") Long clubId);
}
