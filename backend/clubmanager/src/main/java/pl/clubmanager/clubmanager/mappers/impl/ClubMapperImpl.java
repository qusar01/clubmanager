package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.ClubDto;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class ClubMapperImpl implements Mapper<ClubEntity, ClubDto> {

    private ModelMapper modelMapper;

    public ClubMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    @Override
    public ClubDto mapTo(ClubEntity club) {
        return modelMapper.map(club, ClubDto.class);
    }

    @Override
    public ClubEntity mapFrom(ClubDto clubDto) {
        return modelMapper.map(clubDto, ClubEntity.class);
    }
}
