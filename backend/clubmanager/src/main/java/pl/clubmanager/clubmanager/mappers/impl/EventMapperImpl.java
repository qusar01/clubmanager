package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.EventDto;
import pl.clubmanager.clubmanager.domain.entities.EventEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class EventMapperImpl implements Mapper<EventEntity, EventDto> {

    private ModelMapper modelMapper;

    public EventMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public EventDto mapTo(EventEntity event) {
        return modelMapper.map(event, EventDto.class);
    }

    @Override
    public EventEntity mapFrom(EventDto eventDto) {
        return modelMapper.map(eventDto, EventEntity.class);
    }
}
