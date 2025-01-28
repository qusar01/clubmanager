package pl.clubmanager.clubmanager.services.impl;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.enums.Status;
import pl.clubmanager.clubmanager.repositories.ClubRepository;
import pl.clubmanager.clubmanager.repositories.PaymentRepository;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.PaymentService;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PaymentServiceImpl implements PaymentService {

    private PaymentRepository paymentRepository;

    private ClubRepository clubRepository;

    private UserRepository userRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, ClubRepository clubRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.clubRepository = clubRepository;
        this.userRepository = userRepository;
    }
    @Override
    public PaymentEntity save(PaymentEntity payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public boolean isExists(Long paymentId) {
        return paymentRepository.existsById(paymentId);
    }

    @Override
    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }

    @Override
    public List<PaymentEntity> findAll() {
        return StreamSupport.stream(paymentRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentEntity> findById(Long id) {
        return paymentRepository.findById(id);
    }

    @Override
    public List<PaymentEntity> findByClubId(Long clubId) {
        return paymentRepository.findByClubId(clubId);
    }

    @Override
    public List<PaymentEntity> findByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }


    @Override
    @Transactional
    @Scheduled(cron = "0 40 * * * * ")
    public void generateMonthlyPayments() {
        System.out.println("Scheduled task is running...");

        List<ClubEntity> clubs = StreamSupport.stream(clubRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());

        for (ClubEntity club : clubs) {
            if(!club.getIsPaymentEnabled()) {
                continue;
            }

            if(!paymentRepository.existsByClubIdAndPaymentYearAndPaymentMonth(
                    club.getId(),
                    String.valueOf(LocalDate.now().getYear()),
                    LocalDate.now().format(DateTimeFormatter.ofPattern("LLLL", new Locale("pl", "PL"))))) {

                List<UserEntity> members = clubRepository.findUsersByClubId(club.getId());
                Integer membershipFee = club.getMembershipFee();

                for (UserEntity member : members) {
                    if(member.getRole().equals(Role.COMPETITOR)) {
                        PaymentEntity payment = PaymentEntity.builder()
                                .club(club)
                                .user(member)
                                .amount(membershipFee)
                                .status(Status.PENDING)
                                .paymentDate(null)
                                .dueDate(YearMonth.now().atEndOfMonth())
                                .paymentYear(String.valueOf(LocalDate.now().getYear()))
                                .paymentMonth(LocalDate.now().format(DateTimeFormatter.ofPattern(
                                        "LLLL", new Locale("pl", "PL"))))
                                .paymentId(null)
                                .build();
                        paymentRepository.save(payment);
                    }
                }
             }

        }
    }
}
