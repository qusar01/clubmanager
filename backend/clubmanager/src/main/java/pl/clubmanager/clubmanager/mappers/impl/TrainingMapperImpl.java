package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.TrainingDto;
import pl.clubmanager.clubmanager.domain.entities.TrainingEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class TrainingMapperImpl implements Mapper<TrainingEntity, TrainingDto> {

    private ModelMapper modelMapper;

    public TrainingMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public TrainingDto mapTo(TrainingEntity training) {
        return modelMapper.map(training, TrainingDto.class);
    }

    @Override
    public TrainingEntity mapFrom(TrainingDto trainingDto) {
        return modelMapper.map(trainingDto, TrainingEntity.class);
    }
}
