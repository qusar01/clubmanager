package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.AttendanceDto;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class AttendanceMapperImpl implements Mapper<AttendanceEntity, AttendanceDto> {

    private ModelMapper modelMapper;

    public AttendanceMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public AttendanceDto mapTo(AttendanceEntity attendance) {
        return modelMapper.map(attendance, AttendanceDto.class);
    }

    @Override
    public AttendanceEntity mapFrom(AttendanceDto attendanceDto) {
        return modelMapper.map(attendanceDto, AttendanceEntity.class);
    }
}
