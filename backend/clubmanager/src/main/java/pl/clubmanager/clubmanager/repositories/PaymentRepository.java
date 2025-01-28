package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends CrudRepository<PaymentEntity, Long> {
    List<PaymentEntity> findByClubId(Long clubId);

    List<PaymentEntity> findByUserId(Long userId);

    Boolean existsByClubIdAndPaymentYearAndPaymentMonth(Long clubId, String paymentYear, String paymentMonth);
}
