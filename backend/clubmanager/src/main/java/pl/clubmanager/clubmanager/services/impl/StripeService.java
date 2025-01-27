package pl.clubmanager.clubmanager.services.impl;


import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;

import java.util.Arrays;

@Service
public class StripeService {

    @Value("$(stripe.pk)")
    private String publicKey;

    public String createCheckoutSession(PaymentEntity payment) throws Exception {

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(
                        SessionCreateParams.PaymentMethodType.CARD
                )
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("pln")
                                                .setUnitAmount((long) (payment.getAmount() * 100))
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success")
                .setCancelUrl("http://localhost:3000/cancel")
                .build();

        Session session = Session.create(params);

        return session.getId();
    }

}
