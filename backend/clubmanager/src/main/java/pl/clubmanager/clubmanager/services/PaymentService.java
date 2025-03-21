package pl.clubmanager.clubmanager.services;


import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;

import java.util.List;
import java.util.Optional;

public interface PaymentService {

    PaymentEntity save(PaymentEntity payment);

    boolean isExists(Long paymentId);

    void delete(Long id);

    List<PaymentEntity> findAll();

    Optional<PaymentEntity> findById(Long id);

    List<PaymentEntity> findByClubId(Long clubId);

    List<PaymentEntity> findByUserId(Long userId);

    void generateMonthlyPayments();
}
