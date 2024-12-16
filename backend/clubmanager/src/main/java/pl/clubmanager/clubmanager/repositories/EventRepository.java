package pl.clubmanager.clubmanager.repositories;

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
}
