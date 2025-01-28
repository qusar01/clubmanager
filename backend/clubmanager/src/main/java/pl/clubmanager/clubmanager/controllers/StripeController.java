package pl.clubmanager.clubmanager.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.entities.PaymentEntity;
import pl.clubmanager.clubmanager.enums.Status;
import pl.clubmanager.clubmanager.services.PaymentService;
import pl.clubmanager.clubmanager.services.impl.StripeService;

import java.time.LocalDate;
import java.util.Map;

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
    public ResponseEntity<?> createCheckoutSession(@PathVariable Long paymentId) throws Exception{
        try {
            PaymentEntity payment = paymentService.findById(paymentId).orElseThrow(() -> new RuntimeException("Payment not found"));
            String checkoutUrl = stripeService.createCheckoutSession(payment);

            return ResponseEntity.ok(Map.of("checkoutUrl", checkoutUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during creating checkout session");
        }
    }

    @GetMapping("/payment-close")
    public ResponseEntity<String> handlePaymentSuccess(@RequestParam("paymentId") Long paymentId) {
        try {
            PaymentEntity payment = paymentService.findById(paymentId)
                    .orElseThrow(() -> new RuntimeException("Nie znaleziono płatności o ID: " + paymentId));

            Session session = Session.retrieve(payment.getSessionId());

            if ("paid".equals(session.getPaymentStatus())) {
                payment.setStatus(Status.PAID);
                payment.setPaymentDate(LocalDate.now());
                paymentService.save(payment);

                return ResponseEntity.ok("Płatność zakończona sukcesem.");
            } else if ("unpaid".equals(session.getPaymentStatus())) {
                payment.setStatus(Status.FAILED);
                paymentService.save(payment);

                return ResponseEntity.ok("Płatność nie powiodła się.");
            } else if ("requires_payment_method".equals(session.getPaymentStatus())) {
                payment.setStatus(Status.FAILED);
                paymentService.save(payment);

                return ResponseEntity.ok("Brak metody płatności.");
            } else if ("requires_action".equals(session.getPaymentStatus())) {
                payment.setStatus(Status.FAILED);
                paymentService.save(payment);

                return ResponseEntity.ok("Wymaga dodatkowej weryfikacji.");
            } else {
                payment.setStatus(Status.FAILED);
                paymentService.save(payment);

                return ResponseEntity.ok("Płatność w trakcie realizacji lub nie zakończona.");
            }

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd podczas weryfikacji płatności.");
        }
    }

    @GetMapping("/payment-cancel")
    public ResponseEntity<String> handlePaymentCancel(@RequestParam("paymentId") Long paymentId){
        try {
            PaymentEntity payment = paymentService.findById(paymentId)
                    .orElseThrow(() -> new RuntimeException("Nie znaleziono płatności o ID: " + paymentId));

            PaymentIntent paymentIntent = stripeService.getPaymentIntent(payment.getPaymentId());
            if ("canceled".equals(paymentIntent.getStatus())) {
                payment.setStatus(Status.FAILED);
                paymentService.save(payment);

                return ResponseEntity.ok("Płatność anulowana.");
            } else {
                return ResponseEntity.ok("Płatność zakończona.");
            }

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd podczas weryfikacji płatności.");
        }
    }
}
