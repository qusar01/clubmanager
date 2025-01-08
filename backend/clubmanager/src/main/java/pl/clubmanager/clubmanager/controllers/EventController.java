package pl.clubmanager.clubmanager.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.EventDto;
import pl.clubmanager.clubmanager.domain.entities.EventEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.EventService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/events")
@RestController
public class EventController {

    private EventService eventService;

    private Mapper<EventEntity, EventDto> eventMapper;

    public EventController(EventService eventService, Mapper<EventEntity, EventDto> eventMapper) {
        this.eventService = eventService;
        this.eventMapper = eventMapper;
    }

    @PostMapping
    public EventDto createEvent(@Valid @RequestBody EventDto eventDto) {
        EventEntity eventEntity = eventMapper.mapFrom(eventDto);
        EventEntity savedEventEntity = eventService.save(eventEntity);
        return eventMapper.mapTo(savedEventEntity);
    }

    @GetMapping
    public List<EventDto> listEvents() {
        List<EventEntity> events = eventService.findAll();
        return events.stream().map(eventMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/club/{id}")
    public List<EventDto> listClubEvents(@PathVariable("id") Long id){
        List<EventEntity> events = eventService.findByClubId(id);
        return events.stream().map(eventMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/coach/{id}")
    public List<EventDto> listCoachEvents(@PathVariable("id") Long id){
        List<EventEntity> events = eventService.findByCoachId(id);
        return events.stream().map(eventMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/club/{clubId}/user/{userId}")
    public List<EventDto> listActiveEvents(@PathVariable("clubId") Long clubId, @PathVariable("userId") Long userId){
        List<EventEntity> events = eventService.getActiveEvents(clubId, userId);
        return events.stream().map(eventMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable("id") Long id) {
        Optional<EventEntity> event = eventService.findById(id);
        return event.map(eventEntity -> {
            EventDto eventDto = eventMapper.mapTo(eventEntity);
            return new ResponseEntity<>(eventDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<EventDto> fullUpdateEvent(@PathVariable("id") Long id, @RequestBody EventDto eventDto) {
        if(!eventService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        eventDto.setId(id);
        EventEntity eventEntity = eventMapper.mapFrom(eventDto);
        EventEntity updatedEventEntity = eventService.save(eventEntity);

        return new ResponseEntity<>(eventMapper.mapTo(updatedEventEntity), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<EventDto> deleteEvent(@PathVariable("id") Long id) {
        if(!eventService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        eventService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
