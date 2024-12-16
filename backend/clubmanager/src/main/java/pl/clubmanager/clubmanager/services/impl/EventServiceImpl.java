package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.EventEntity;
import pl.clubmanager.clubmanager.repositories.EventRepository;
import pl.clubmanager.clubmanager.services.EventService;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public EventEntity save(EventEntity eventEntity) {
        return eventRepository.save(eventEntity);
    }

    @Override
    public boolean isExists(Long id) {
        return eventRepository.existsById(id);
    }

    @Override
    public void delete(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<EventEntity> findAll() {
        return StreamSupport.stream(eventRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<EventEntity> findById(Long id) {
        return eventRepository.findById(id);
    }

    @Override
    public List<EventEntity> findByCoachId(Long id) {
        return eventRepository.findByCoachId(id);
    }

    @Override
    public List<EventEntity> findByClubId(Long clubId) {
        return eventRepository.findByClubId(clubId);
    }

    @Override
    public List<EventEntity> findByStartTimeBetween(Date start, Date end) {
        return eventRepository.findByStartTimeBetween(start, end);
    }
}
