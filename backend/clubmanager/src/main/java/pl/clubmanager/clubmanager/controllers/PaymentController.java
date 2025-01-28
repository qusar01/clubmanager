package pl.clubmanager.clubmanager.controllers;

import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.PaymentDTO;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.PaymentService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private PaymentService paymentService;

    private Mapper<PaymentEntity, PaymentDTO> paymentMapper;

    public PaymentController(PaymentService paymentService, Mapper<PaymentEntity, PaymentDTO> paymentMapper) {
        this.paymentService = paymentService;
        this.paymentMapper = paymentMapper;
    }

    @GetMapping
    public List<PaymentDTO> listPayments() {
        List<PaymentEntity> payments = paymentService.findAll();
        return payments.stream().map(paymentMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public PaymentDTO getPayment(@PathVariable("id") Long id) {
        Optional<PaymentEntity> payment = paymentService.findById(id);
        return payment.map(paymentMapper::mapTo).orElse(null);
    }

    @GetMapping(path = "/club/{clubId}")
    public List<PaymentDTO> getPaymentsByClubId(@PathVariable("clubId") Long clubId) {
        List<PaymentEntity> payments = paymentService.findByClubId(clubId);
        return payments.stream().map(paymentMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/user/{userId}")
    public List<PaymentDTO> getPaymentsByUserId(@PathVariable("userId") Long userId) {
        List<PaymentEntity> payments = paymentService.findByUserId(userId);
        return payments.stream().map(paymentMapper::mapTo).collect(Collectors.toList());
    }

}
