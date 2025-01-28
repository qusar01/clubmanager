package pl.clubmanager.clubmanager.domain.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentDTO {
    private Long id;
    private Long clubId;
    private Long userId;
    private Integer amount;
    private String status;
    private LocalDate paymentDate;
    private LocalDate dueDate;
    private String paymentYear;
    private String paymentMonth;
    private String paymentId;
    private String sessionId;
}
