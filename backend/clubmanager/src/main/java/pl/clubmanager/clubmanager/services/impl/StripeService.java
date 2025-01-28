package pl.clubmanager.clubmanager.services.impl;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.repositories.PaymentRepository;

import java.util.Arrays;

@Service
public class StripeService {

    @Value("$(stripe.pk)")
    private String publicKey;

    private PaymentRepository paymentRepository;

    public StripeService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

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
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Składka członkowska")
                                                                .build()
                                                )
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success?paymentId=" + payment.getId())
                .setCancelUrl("http://localhost:3000/cancel?paymentId=" + payment.getId())
                .build();

        Session session = Session.create(params);

        payment.setSessionId(session.getId());
        paymentRepository.save(payment);

        return session.getUrl();
    }

    public PaymentIntent getPaymentIntent(String paymentId) throws StripeException {

        return PaymentIntent.retrieve(paymentId);
    }

}
