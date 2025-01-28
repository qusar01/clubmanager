package pl.clubmanager.clubmanager.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pl.clubmanager.clubmanager.domain.dto.PaymentDTO;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;

@Component
public class PaymentMapperImpl implements Mapper<PaymentEntity, PaymentDTO> {

    private ModelMapper modelMapper;

    public PaymentMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public PaymentDTO mapTo(PaymentEntity payment) {
        return modelMapper.map(payment, PaymentDTO.class);
    }

    @Override
    public PaymentEntity mapFrom(PaymentDTO paymentDTO) {
        return modelMapper.map(paymentDTO, PaymentEntity.class);
    }

}
