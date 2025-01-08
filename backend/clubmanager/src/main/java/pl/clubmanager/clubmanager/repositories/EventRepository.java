package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.EventEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<EventEntity, Long> {

    List<EventEntity> findByClubId(Long clubId);

    List<EventEntity> findByCoachId(Long coachId);

    List<EventEntity> findByStartTimeBetween(Date start, Date end);

    List<EventEntity> findByClubIdAndStartTimeBetween(Long clubId, Date start, Date end);

    @Query("SELECT e FROM events e " +
            "WHERE e.club.id = :clubId " +
            "AND e.startTime <= :now " +
            "AND e.endTime >= :now " +
            "AND NOT EXISTS ( " +
            "   SELECT a FROM attendances a " +
            "   WHERE a.event = e " +
            "   AND a.user.id = :userId " +
            ")")
    List<EventEntity> findActiveEventsForUser(Long clubId, Long userId, Date now);
}
