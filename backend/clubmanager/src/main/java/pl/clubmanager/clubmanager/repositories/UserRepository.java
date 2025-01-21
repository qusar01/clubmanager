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

    @Query("""
       SELECT u.id, u.firstName, u.lastName, COUNT(a)
       FROM UserEntity u
       LEFT JOIN u.attendances a
       LEFT JOIN a.training t
       LEFT JOIN a.event e
       WHERE 
           u.role = 'COMPETITOR' AND
           ((t.club.id = :clubId OR e.club.id = :clubId) AND
           (t.startTime BETWEEN :start AND :end OR e.startTime BETWEEN :start AND :end) 
           OR a.id IS NULL)
       GROUP BY u.id, u.firstName, u.lastName
       ORDER BY COUNT(a) DESC
    """)
    List<Object[]> getRankingForClub(@Param("clubId") Long clubId, @Param("start") Date start, @Param("end") Date end);

}
