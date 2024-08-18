package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.UserDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class UserMapperImpl implements Mapper<UserEntity, UserDto> {

    private ModelMapper modelMapper;

    public UserMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto mapTo(UserEntity user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserEntity mapFrom(UserDto userDto) {
        return modelMapper.map(userDto, UserEntity.class);
    }
}
