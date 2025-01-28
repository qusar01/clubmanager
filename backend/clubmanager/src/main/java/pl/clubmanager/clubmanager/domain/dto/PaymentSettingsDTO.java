package pl.clubmanager.clubmanager.domain.dto;

import lombok.Data;

@Data
public class PaymentSettingsDTO {

    private Integer membershipFee;

    private Boolean isPaymentEnabled;
}
