package pl.clubmanager.clubmanager.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.services.PaymentService;
import pl.clubmanager.clubmanager.services.impl.StripeService;

@RestController
@RequestMapping("/stripe")
public class StripeController {

    private StripeService stripeService;

    private PaymentService paymentService;

    public StripeController(StripeService stripeService, PaymentService paymentService) {
        this.stripeService = stripeService;
        this.paymentService = paymentService;
    }

    @PostMapping("/create-checkout-session/{paymentId}")
    public String createCheckoutSession(@PathVariable Long paymentId) throws Exception{
        PaymentEntity payment = paymentService.findById(paymentId).orElseThrow(() -> new RuntimeException("Payment not found"));

        return stripeService.createCheckoutSession(payment);
    }
}
