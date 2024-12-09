package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.InvitationDto;
import pl.clubmanager.clubmanager.domain.entities.InvitationEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class InvitationMapperImpl implements Mapper<InvitationEntity, InvitationDto> {

    private ModelMapper modelMapper;

    public InvitationMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public InvitationDto mapTo(InvitationEntity invitation) {
        return modelMapper.map(invitation, InvitationDto.class);
    }

    @Override
    public InvitationEntity mapFrom(InvitationDto invitationDto) {
        return modelMapper.map(invitationDto, InvitationEntity.class);
    }

}
