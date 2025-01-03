package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.entities.EventEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {

    EventEntity save(EventEntity EventEntity);
    boolean isExists(Long id);
    void delete(Long id);

    List<EventEntity> findAll();

    Optional<EventEntity> findById(Long id);

    List<EventEntity> findByCoachId(Long id);

    List<EventEntity> findByClubId(Long clubId);

    List<EventEntity> findByStartTimeBetween(Date start, Date end);

    List<EventEntity> getEventsForCurrentMonth(Long clubId);

    List<EventEntity> getActiveEvents(Long clubId, Long userId);
}
