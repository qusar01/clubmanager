package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

import java.util.Date;
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

    @Query("""
       SELECT u.id, u.firstName, u.lastName, COUNT(a)
       FROM ClubEntity c
       JOIN c.users u 
       LEFT JOIN u.attendances a
       LEFT JOIN a.training t
       LEFT JOIN a.event e
       WHERE 
           u.role = 'COMPETITOR' AND
           c.id = :clubId
           AND ((t.club.id = :clubId OR e.club.id = :clubId) 
                AND (t.startTime BETWEEN :start AND :end OR e.startTime BETWEEN :start AND :end)
                OR a.id IS NULL)
       GROUP BY u.id, u.firstName, u.lastName
       ORDER BY COUNT(a) DESC
    """)
    List<Object[]> getRankingForClub(@Param("clubId") Long clubId, @Param("start") Date start, @Param("end") Date end);

}
